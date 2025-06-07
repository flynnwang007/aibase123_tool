import { Request, Response } from 'express';
import * as userService from '../services/userService';
import { validateEmail, validatePassword } from '../utils/validators';

export const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username, email, password } = req.body;

    // 验证输入
    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    if (!validatePassword(password)) {
      return res.status(400).json({ 
        message: 'Password must be at least 8 characters long' 
      });
    }

    // 检查邮箱是否已存在
    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // 创建用户
    const userId = await userService.createUser({ username, email, password });
    const token = userService.generateToken(userId, 'user');

    return res.status(201).json({ token });
  } catch (error) {
    console.error('Error in register:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    // 查找用户
    const user = await userService.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 验证密码
    const isValid = await userService.validatePassword(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 生成token
    const token = userService.generateToken(user.id, user.role);

    return res.json({ token });
  } catch (error) {
    console.error('Error in login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const forgotPassword = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const token = await userService.createPasswordResetToken(email);

    // TODO: 发送重置密码邮件
    // 这里应该集成邮件服务，暂时返回token用于测试
    return res.json({ 
      message: 'Password reset instructions sent to your email',
      token // 在生产环境中移除
    });
  } catch (error) {
    console.error('Error in forgotPassword:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const resetPassword = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { token, newPassword } = req.body;

    if (!validatePassword(newPassword)) {
      return res.status(400).json({ 
        message: 'Password must be at least 8 characters long and contain uppercase, lowercase, number and special character' 
      });
    }

    await userService.resetPassword(token, newPassword);
    return res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error in resetPassword:', error);
    if (error instanceof Error && error.message === 'Invalid or expired reset token') {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await userService.createUser(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}; 