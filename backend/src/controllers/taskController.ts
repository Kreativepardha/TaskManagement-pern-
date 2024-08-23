import { NextFunction, Request, Response } from 'express';
import { taskBody } from '../validations/taskBody';
import { formatError } from '../validations/userBody';
import { Prisma } from '../config/DBconfig';
import { TaskCreateInput } from '../types/taskTypes';

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = taskBody.safeParse(req.body);
    if (!result.success) {
      const formattedErrors = formatError(result.error);
      return res.status(422).json({
        message: 'Invalid inputs',
        errors: formattedErrors,
      });
    }
    const payload: TaskCreateInput = result.data;
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({
        message: 'Unauthorizedd: no user id found',
      });
    }
    const task = await Prisma.task.create({
      data: {
        ...payload,
        userId,
      },
    });
    return res.status(201).json({
      message: 'Task created successfully',
      task,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const tasks = await Prisma.task.findMany({
      skip,
      take: limit,
      include: {
        user: true,
      },
    });
    return res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

export const getTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskId = parseInt(req.params.id, 10);
    if (isNaN(taskId)) {
      return res.status(400).json({
        message: 'Invalid task ID',
      });
    }
    const task = await Prisma.task.findUnique({
      where: {
        id: taskId,
      },
      include: {
        user: true,
      },
    });
    if (!task) {
      return res.status(404).json({
        message: 'Task not found',
      });
    }
    return res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskId = parseInt(req.params.id, 10);
    if (isNaN(taskId)) {
      return res.status(400).json({
        message: 'Invalid task Id',
      });
    }

    const result = taskBody.safeParse(req.body);
    if (!result.success) {
      const formattedErrors = formatError(result.error);
      return res.status(422).json({
        message: 'Invalid inputs',
        errors: formattedErrors,
      });
    }

    const updatedData = result.data;

    const task = await Prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        ...updatedData,
      },
    });

    return res.status(201).json({
      message: 'Task updated successfully',
      task,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskId = parseInt(req.params.id, 10);

    if (isNaN(taskId)) {
      return res.status(404).json({ message: 'Task id not exists' });
    }

    await Prisma.task.delete({
      where: {
        id: taskId,
      },
    });

    res.status(200).json({
      message: 'Task deleted succesfuullllly',
    });
  } catch (err) {
    next(err);
  }
};

export const searchTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res
        .status(400)
        .json({ message: "Query paramter 'q' is required" });
    }

    const tasks = await Prisma.task.findMany({
      where: {
        OR: [
          { title: { contains: q as string, mode: 'insensitive' } },
          { description: { contains: q as string, mode: 'insensitive' } },
        ],
      },
    });

    res.json({ tasks });
  } catch (err) {
    next(err);
  }
};
