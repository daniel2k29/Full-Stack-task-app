import  { Request, Response } from "express";
import prisma from "../lib/prisma";

type TaskParams = {
  id: string;
};

export const createTask = async (req: Request, res: Response) => {
    try {
        const {title, description} = req.body;
        const userId = (req as any).userId;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (!title) return res.status(400).json( {message: 'Title is required'});
        const task = await prisma.task.create({
            data: {
                title, description: description || '', userId: userId
            }
        });

        res.status(201).json(task);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Server error'});
    }
}

export const getTask = async (req: Request, res: Response) => {
    try {
       const userId = (req as any).userId;

        
        const task = await prisma.task.findMany({
            where: {userId},
            orderBy: {createdAt: "desc"}
        });

        res.status(201).json(task);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Server error'});
    }
}

export const updateTask = async (req: Request<TaskParams>, res: Response) => {
    try {
        const {id} = req.params;
        const {title, description, completed} = req.body;
        const userId = (req as any).userId;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const task = await prisma.task.findUnique({ where: { id } });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (task.userId !== userId) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        const updatedTask = await prisma.task.update({
            where: { id },
            data: { title, description, completed },
        });

        res.status(200).json(updatedTask);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Server error'});
    }
}

export const deleteTask = async (req: Request<TaskParams>, res: Response) => {
    try {
        const {id} = req.params;
        const userId = (req as any).userId;

        const task = await prisma.task.findUnique({ where: { id } });

        if (!task) return res.status(404).json({ message: 'Task not found' });

        if (task.userId !== userId) return res.status(403).json({ message: 'Forbidden' });

         await prisma.task.delete({ where: { id },});

        res.json({ message: 'Task deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Server error'});
    }
}