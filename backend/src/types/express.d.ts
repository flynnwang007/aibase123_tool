import { RequestHandler } from 'express';

declare module 'express' {
  interface Request {
    user?: {
      userId: number;
      role: string;
    };
  }
}

declare global {
  type ControllerHandler = (
    req: Request,
    res: Response,
    next?: NextFunction
  ) => Promise<Response> | void;
} 