import { NextFunction, Request, Response } from "express";
import { getSecrets, refreshTokens } from "../utils/auth.utils";
import prisma from '../utils/db.utils'
import jwt from "jsonwebtoken";

export default async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {


    const { accessSecret } = getSecrets()
    const accessToken: string = req.cookies.access;

    if (!accessSecret) return res.status(500).json({ message: "Access Secret not found" });
    if (!accessToken) return res.status(401).json({ message: "UnAuthorized" });
    try {

        const decoded: { id: string } = await jwt.verify(accessToken, accessSecret) as { id: string };
        const user = await prisma.user.findUnique({ where: { id: decoded.id } });
        if (!user) return res.status(401).json({ message: "UnAtuhorized" });
        req.user = decoded;
        return next();

    }
    catch (err) {
        // console.error(err);
        if (!req.cookies.refresh) return res.status(401).json({ message: "UnAuthorized" })
        const newAccessToken = await refreshTokens(req.cookies.refresh);
        if (!newAccessToken) {
            return res.status(401).json({ message: "Unauthorized" });
        }


        try {
            res.cookie('access', newAccessToken, { httpOnly: true, sameSite: 'strict', maxAge: 60 * 15 * 1000 });
            const decoded: { id: string } = await jwt.verify(newAccessToken, accessSecret) as { id: string };
            req.user = decoded;
            return next();
        }
        catch (err) {
            console.error(err);
            return res.status(401).json({ message: "UnAuthorized" });
        }
    }

}