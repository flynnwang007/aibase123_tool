import { Router } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import { 
  register, 
  login, 
  forgotPassword, 
  resetPassword 
} from '../controllers/userController';

const router = Router();

router.post('/register', register as unknown as RequestHandler);
router.post('/login', login as unknown as RequestHandler);
router.post('/forgot-password', forgotPassword as unknown as RequestHandler);
router.post('/reset-password', resetPassword as unknown as RequestHandler);

export default router; 