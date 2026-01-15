import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import prisma from "../lib/prisma";
import { signToken } from "../utils/jwt";

export const signup = async ( req: Request, res: Response) => {
    const { email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password required'})
    }

    const existingUser = await prisma.user.findUnique({
        where: {email},
    })

    if (existingUser) {
        return res.status(409).json({ message: 'User already exists'});
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
        },
    });

    const token = signToken({ userId: user.id});

    res.status(201).json({ token, 
       });
};

export const login = async( req: Request, res: Response ) => {
    const { email, password} = req.body;

     const user = await prisma.user.findUnique({
        where: {email},
    });

    if (!email || !password) {
     return res.status(400).json({ message: 'Email and password required' });
    }

    if(!user) {
        return res.status(401).json({ message: 'Invalid credentials'});
    }

    const isMatch = await bcrypt.compare(password, user.password);

      if(!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials'});
    }

    const token = signToken({ userId: user.id});

    res.json({token});
};