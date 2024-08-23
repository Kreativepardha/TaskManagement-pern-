import { Router } from 'express';
import { taskRouter } from './taskRouter';
import { userRouter } from './userRouter';
import { isAuthenticated } from '../middlewares/AuthMiddleware';
import redisCache from '../config/redisConfig';

const router = Router();

router.use('/user', userRouter);
router.use('/task', isAuthenticated, redisCache.route(), taskRouter);

export { router as mainRouter };
