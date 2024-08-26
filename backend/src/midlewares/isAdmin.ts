import { AuthRequest } from "../utils/auth.utils";
import { NextFunction, Response } from "express";
import prisma from '../utils/db.utils'

export default async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: req.user.id } });
        console.log(user)
        if (!user || !user.isAdmin) return res.status(403).json({ message: "Unauthorized" });
        return next();
    }
    catch (error) {
        console.log(error)
        return res.status(403).json({ message: "Unauthorized" });
    }
}