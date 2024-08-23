import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import bcrypt from 'bcrypt';
import { mainRouter } from './routes/mainRouter';
import { limiter } from './config/rateLimit';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;
export const JWT_SECRET = process.env.JWT_SECRET;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(errorHandler);
app.get('/', async (req: any, res: any) => {
  return res.json({ message: 'HElath cheack' });
});

app.use('/api/v1', mainRouter);
app.listen(PORT, () => {
  console.log(`server listening to port ${PORT}`);
});
