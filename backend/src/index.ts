import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import toolsRouter from './routes/tools';
import userRouter from './routes/users';
import { errorHandler } from './middleware/errorHandler';
import { AppError } from './middleware/errorHandler';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 静态文件服务
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// 路由
app.use('/api/tools', toolsRouter);
app.use('/api/users', userRouter);

// 错误处理
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 