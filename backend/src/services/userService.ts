import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import pool from '../config/database';
import { User } from '../types';

export const createUser = async (userData: Partial<User>) => {
  const hashedPassword = await bcrypt.hash(userData.password!, 10);
  
  const [result] = await pool.query(`
    INSERT INTO users (username, email, password, role)
    VALUES (?, ?, ?, ?)
  `, [userData.username, userData.email, hashedPassword, 'user']);

  return (result as any).insertId;
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  const users = rows as User[];
  return users.length > 0 ? users[0] : null;
};

export const validatePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateToken = (userId: number, role: string): string => {
  const options: SignOptions = {
    expiresIn: process.env.JWT_EXPIRES_IN as string || '1h',
    algorithm: 'HS256'
  };
  
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET!,
    options
  );
};

export const createPasswordResetToken = async (email: string): Promise<string> => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error('User not found');
  }

  const token = jwt.sign(
    { userId: user.id, type: 'password_reset' },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  );

  // 存储重置token
  await pool.query(`
    UPDATE users 
    SET reset_token = ?, reset_token_expires = DATE_ADD(NOW(), INTERVAL 1 HOUR)
    WHERE id = ?
  `, [token, user.id]);

  return token;
};

export const resetPassword = async (token: string, newPassword: string): Promise<void> => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
  
  const [rows] = await pool.query(`
    SELECT * FROM users 
    WHERE id = ? AND reset_token = ? AND reset_token_expires > NOW()
  `, [decoded.userId, token]);

  if (!rows || !(rows as any[]).length) {
    throw new Error('Invalid or expired reset token');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  
  await pool.query(`
    UPDATE users 
    SET password = ?, reset_token = NULL, reset_token_expires = NULL 
    WHERE id = ?
  `, [hashedPassword, decoded.userId]);
}; 