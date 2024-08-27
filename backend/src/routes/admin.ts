import { Response, Router } from "express";
import { AuthRequest } from "../utils/auth.utils";
import { isEmail, isPhoneNumber, isStrongPassword, isUUID, isValidOrderQuery } from "../utils/validations.utils";
import prisma from '../utils/db.utils';
import { hash } from "bcrypt";
import { User } from "@prisma/client";
const router = Router();
//* users model crude operations
router.get('/users', async (req: AuthRequest, res: Response) => {
    try {
        const {
            /*search query*/page, type, role, phone, family_name, given_name, nickname, email,
            /*order query */ order_created_at, order_names, order_oreders

        } = req.query
        const current_page: number = Number.parseInt(page as string) || 1;
        if (Number.isNaN(current_page)) return res.status(400).json({ message: "Invalid query paramerter <page>" });
        const page_size: number = 20;
        const constraints = {
            NOT: {
                id: req.user.id
            },
            ...(role ? (role === 'admin' ? { isAdmin: true } : { isAdmin: false }) : {}),
            ...(type ? (type === 'google' ? { NOT: { google_id: null } } : { google_id: null }) : {}),
            ...(email && { email: { contains: email as string } }),
            profile: {
                ...(phone && { phone: { contains: phone as string } }),
                ...(family_name && { family_name: { contains: family_name as string } }),
                ...(given_name && { given_name: { contains: given_name as string } }),
                ...(nickname && { nickname: { contains: nickname as string } }),

            }
        }
        const total_records: number = await prisma.user.count({
            where: constraints
        })
        const total_pages: number = Math.ceil(total_records / page_size);
        const users: User[] = await prisma.user.findMany({
            where: constraints,
            include: {
                profile: true
            },
            orderBy: {
                ...(order_created_at && { createdAt: order_created_at as 'asc' | 'desc' }),
                ...((order_names || order_oreders) && {
                    profile: {
                        ...(order_names && { family_name: order_names as 'asc' | 'desc' }),
                        ...(order_oreders && { orders: { _count: order_oreders as 'asc' | 'desc' } })
                    }
                })
            },
            skip: (current_page - 1) * page_size,
            take: page_size,
        });
        return res.status(200).json({ users, current_page, total_pages, });
    }
    catch (err) {
        console.error("Error:", new Error(err));
        return res.status(500).json({ message: "an error occurred while retrieving users" });
    }
})
router.get('/users/:id', async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    if (!isUUID(id)) return res.status(400).json({ message: "invalid url parameter" });
    if (req.user.id === id) return res.status(400).json({ message: "redirect to profile page" });

    try {
        const user = await prisma.user.findUnique({ where: { id }, include: { profile: true } });
        if (!user) return res.status(404).json({ message: "user not found" });
        return res.status(200).json({ user });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "an error occurred while retrieving user" });
    }
})
router.post('/users', async (req: AuthRequest, res: Response) => {
    const { email, password, isAdmin, family_name, nickname, given_name, phone } = req.body;
    if (!email || !password || !family_name || !phone || !given_name) return res.status(400).json({ message: "missing required fields" });
    if (!isEmail(email)) return res.status(400).json({ message: "invalid email" });
    if (!isPhoneNumber(phone)) return res.status(400).json({ message: "invalid phone number" });
    if (!isStrongPassword(password)) return res.status(400).json({ message: "password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character" });
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (user) return res.status(400).json({ message: "email is already in use" });
        const newUser = await prisma.user.create({
            data: {
                email,
                password: await hash(password, 12),
                isAdmin,
                profile: {
                    create: {
                        family_name,
                        given_name,
                        nickname: nickname || null,
                        phone,
                    }
                }
            }
        });
        return res.status(201).json({ message: "user created successfully", user: newUser });

    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "error creating user" });
    }
})
router.patch('/users/:id', async (req: AuthRequest, res: Response) => {
    type body = {
        email?: string, password?: string, isAdmin?: boolean, family_name?: string, nickname?: string, given_name?: string, phone?: string
    }
    const { id } = req.params;
    const data: body = req.body
    console.log(isUUID(id))
    if (!isUUID(id)) return res.status(400).json({ message: "invalid url parameter" });
    if (data.email && !isEmail(data.email)) return res.status(400).json({ message: "invalid email " });
    if (data.phone && !isPhoneNumber(data.phone)) return res.status(400).json({ message: "invalid phone number" });
    if (data.password && !isStrongPassword(data.password)) return res.status(400).json({ message: "password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character" });

    try {
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) return res.status(404).json({ message: "user not found" });
        await prisma.user.update({
            where: { id }, data: {
                email: data.email, isAdmin: data.isAdmin,
                ...(data.password ? { password: await hash(data.password, 12) } : {}),
                profile: {
                    update: {
                        family_name: data.family_name,
                        given_name: data.given_name,
                        nickname: data.nickname,
                        phone: data.phone,
                    }
                }
            }
        });
        return res.status(200).json({ message: "user updated successfully", user });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: err || "Can not update user" });
    }
})
router.delete('/users/:id', async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    if (!isUUID(id)) return res.status(400).json({ message: "invalid url parameter" });

    try {
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) return res.status(404).json({ message: "user not found" });
        await prisma.user.delete({ where: { id } });
        return res.status(200).json({ message: "user deleted successfully" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Can not delete user" });
    }
})


//* product model crud operations
router.get('/products', (req: AuthRequest, res: Response) => {
    return res.send("here is products for admin");
})

router.post('/products', (req: AuthRequest, res: Response) => {
    return res.send("here is creating products account");
})
router.get('/products/:id', (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    return res.send(`here is products with id ${id}`);
})


router.patch('/products/:id', (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    return res.send(`here is updating products with id ${id}`);
})

router.delete('/products/:id', (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    return res.send(`here is deleting products with id ${id}`);
})
export default router;