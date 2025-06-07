"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const runMigrations = async () => {
    const waitForMysql = async () => {
        while (true) {
            try {
                const connection = await promise_1.default.createConnection({
                    host: process.env.DB_HOST,
                    port: parseInt(process.env.DB_PORT || '3306'),
                    user: process.env.DB_USER,
                    password: process.env.DB_PASS,
                });
                await connection.end();
                break;
            }
            catch (error) {
                console.log('Waiting for MySQL to be ready...');
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    };
    await waitForMysql();
    const connection = await promise_1.default.createConnection({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '3306'),
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
    });
    try {
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
        await connection.query(`USE ${process.env.DB_NAME}`);
        const migrationsDir = path_1.default.join(__dirname, 'migrations');
        const files = fs_1.default.readdirSync(migrationsDir).sort();
        const recordMigration = async (connection, fileName) => {
            await connection.query('INSERT INTO migrations (name) VALUES (?)', [fileName]);
        };
        const hasBeenExecuted = async (connection, fileName) => {
            const [rows] = await connection.query('SELECT * FROM migrations WHERE name = ?', [fileName]);
            return rows.length > 0;
        };
        for (const file of files) {
            if (file.endsWith('.sql')) {
                if (await hasBeenExecuted(connection, file)) {
                    console.log(`Skipping ${file} - already executed`);
                    continue;
                }
                const migration = fs_1.default.readFileSync(path_1.default.join(migrationsDir, file), 'utf8');
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
    }
    catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
    finally {
        await connection.end();
    }
};
runMigrations();
//# sourceMappingURL=migrate.js.map