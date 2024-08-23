import {Request, Response} from 'express'
import { taskBody } from '../validations/taskBody'
import { formatError } from '../validations/userBody';
import { Prisma } from '../config/DBconfig';
import { TaskCreateInput } from '../types/taskTypes';




export const createTask = async (req: Request, res: Response) => {
   try {
     const result = taskBody.safeParse(req.body)
     if (!result.success) {
     const formattedErrors = formatError(result.error); 
        return res.status(422).json({
         message: "Invalid inputs",
         errors: formattedErrors,
      });
    }
    const payload: TaskCreateInput = result.data;
    const userId = req.user?.userId;
    if(!userId){
            return res.status(401).json({
                message: "Unauthorizedd: no user id found"
            })
        }
        const task = await Prisma.task.create({
        data: {
            ...payload,
             userId
            }
    })
    return res.status(201).json({
        message: "Task created successfully",
        task
    })
} catch(err) {
        console.error('Error creating task:', err);
        return res.status(500).json({ message: 'Internal server error'}); 
    }
}

export const getAllTasks = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;
        const tasks = await Prisma.task.findMany({
            skip,
            take: limit,
            include: {
                user: true
            }
        })
        return res.status(200).json(tasks)
    } catch (err) {
        console.error('Error retrieving tasks:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const getTask = async (req: Request, res: Response) => {
    try {
        const taskId = parseInt(req.params.id, 10);
        if(isNaN(taskId)) {
            return res.status(400).json({
                message: "Invalid task ID"
            })
        }
        const task = await Prisma.task.findUnique({
            where:{
                id: taskId,
            },
            include: {
                user:  true
            }
        })
        if(!task) {
            return res.status(404).json({
                message: "Task not found"
            })
        }
        return res.status(201).json(task)
    } catch (err) {
            console.error('Error retrieving task:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const updateTask = async (req: Request, res: Response) => {
    try {
        const taskId = parseInt(req.params.id, 10)
        if(isNaN(taskId)) {
            return res.status(400).json({
                message: "Invalid task Id"
            })
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
            where:{
                id:taskId
            },
            data:{
                ...updatedData
            }
        })

        return res.status(201).json({
            message:"Task updated successfully",
            task
        })
    } catch (err) {
        console.error('Error updating task:', err);
        return res.status(500).json({ message: 'Internal server error' });
        }
}

export const deleteTask = async (req: Request, res: Response) => {
    try {
            const taskId = parseInt(req.params.id, 10);

            if(isNaN(taskId)) {
                return res.status(404).json({ message: "Task id not exists"})
            }

            await Prisma.task.delete({
                where:{
                    id: taskId
                }
            })

            res.status(200).json({
                message:"Task deleted succesfuullllly"
            })
    } catch (err) {
             console.error('Error deleting task:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}