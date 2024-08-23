import { Router } from 'express';
import { Login, Register } from '../controllers/userController';

const router = Router();

router.post('/register', Register);
router.post('/login', Login);

export { router as userRouter };
