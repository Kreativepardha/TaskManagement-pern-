import { Request, Response } from 'express';
import { formatError, LoginBody, RegisterBody } from '../validations/userBody';
import { ZodError } from 'zod';
import bcrypt from 'bcrypt';
import { Prisma } from '../config/DBconfig';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '..';
import { emitWarning } from 'process';

export const Register = async (req: Request, res: Response) => {
  try {
    const result = RegisterBody.safeParse(req.body);

    if (!result.success) {
      const formattedErrors = formatError(result.error);
      return res.status(422).json({
        message: 'Invalid inputs',
        errors: formattedErrors,
      });
    }
    const payload = result.data;
    const existingUser = await Prisma.users.findUnique({
      where: { email: payload.email },
    });
    if (existingUser) {
      return res.status(400).json({
        message: 'USer already existss. please try to login',
      });
    }
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(payload.password, salt);
    const user = await Prisma.users.create({
      data: {
        name: payload.name ?? undefined,
        email: payload.email,
        password: hashedPassword,
      },
    });
    return res.status(200).json({
      message: 'User registerd succesffuly',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.created_at, // Include createdAt
      },
    });
  } catch (err) {
    if (err instanceof ZodError) {
      const formatedErrors = formatError(err);
      return res.status(422).json({
        message: 'ZOd error',
        errors: formatedErrors,
      });
    }
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

export const Login = async (req: Request, res: Response) => {
  try {
    const result = LoginBody.safeParse(req.body);
    if (!result.success) {
      return res.status(422).json({
        message: ' invalid inputs',
      });
    }
    const payload = result.data;
    const existingUser = await Prisma.users.findUnique({
      where: { email: payload.email },
    });
    if (!existingUser) {
      return res.status(401).json({
        message: 'User does not exists try signing up',
      });
    }
    const isPassValid = bcrypt.compareSync(
      payload.password,
      existingUser.password
    );
    if (!isPassValid) {
      return res.status(401).json({
        message: 'EMail or password does not match',
      });
    }
    const token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
      },
      JWT_SECRET as string
    );
    return res.status(200).json({
      message: 'Login succesffull',
      user: {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
        createdAt: existingUser.created_at,
      },
      token: `Bearer ${token}`,
    });
  } catch (err) {
    if (err instanceof ZodError) {
      const formatedErrors = formatError(err);
      return res.status(422).json({
        message: 'ZOd error',
        error: formatedErrors,
      });
    }
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};
