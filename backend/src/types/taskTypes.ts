import { Prisma } from '@prisma/client';

export interface TaskCreateInput {
  title: string;
  description?: string;
  important?: boolean;
  completed?: boolean;
}

// types/express/index.d.ts

import { JwtPayload } from 'jsonwebtoken';

// Update User interface to match the decoded JWT structure
interface User {
  userId: number;
  email: string;
  name: string;
  // Add other fields if necessary
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: User | JwtPayload; // Allow JwtPayload to be an option
  }
}
