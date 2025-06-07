import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

declare module 'jsonwebtoken' {
  export function verify(
    token: string,
    secretOrPublicKey: string | Buffer,
    options?: {
      algorithms?: string[];
      audience?: string | RegExp | Array<string | RegExp>;
      clockTimestamp?: number;
      clockTolerance?: number;
      complete?: boolean;
      issuer?: string | string[];
      ignoreExpiration?: boolean;
      ignoreNotBefore?: boolean;
      jwtid?: string;
      nonce?: string;
      subject?: string;
      maxAge?: string | number;
    }
  ): any;
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};

export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  return next();
}; 