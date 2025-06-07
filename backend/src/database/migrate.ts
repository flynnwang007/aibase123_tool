import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const runMigrations = async () => {
  // 等待 MySQL 容器启动
  const waitForMysql = async () => {
    while (true) {
      try {
        const connection = await mysql.createConnection({
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT || '3306'),
          user: process.env.DB_USER,
          password: process.env.DB_PASS,
        });
        await connection.end();
        break;
      } catch (error) {
        console.log('Waiting for MySQL to be ready...');
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  };

  await waitForMysql();

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  });

  try {
    // 创建数据库（如果不存在）
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    await connection.query(`USE ${process.env.DB_NAME}`);

    // 读取并执行迁移文件
    const migrationsDir = path.join(__dirname, 'migrations');
    const files = fs.readdirSync(migrationsDir).sort();

    const recordMigration = async (connection: mysql.Connection, fileName: string) => {
      await connection.query(
        'INSERT INTO migrations (name) VALUES (?)',
        [fileName]
      );
    };

    const hasBeenExecuted = async (connection: mysql.Connection, fileName: string) => {
      const [rows] = await connection.query(
        'SELECT * FROM migrations WHERE name = ?',
        [fileName]
      );
      return (rows as any[]).length > 0;
    };

    for (const file of files) {
      if (file.endsWith('.sql')) {
        if (await hasBeenExecuted(connection, file)) {
          console.log(`Skipping ${file} - already executed`);
          continue;
        }
        const migration = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
        const queries = migration.split(';').filter(query => query.trim());

        for (const query of queries) {
          if (query.trim()) {
            await connection.query(query);
            console.log(`Executed query from ${file}`);
          }
        }
        await recordMigration(connection, file);
        console.log(`Completed migration: ${file}`);
      }
    }

    console.log('All migrations completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    await connection.end();
  }
};

runMigrations(); 