import { Router, Request, Response, NextFunction, CookieOptions } from "express";
import { isEmail, isPhoneNumber, isStrongPassword } from "../utils/validations.utils";
import prisma from "../utils/db.utils";
import { compare, hash } from 'bcrypt';
import { User } from "@prisma/client";
import { generateTokens, AuthRequest } from '../utils/auth.utils';
import jwt from 'jsonwebtoken'
import { sendMail } from "../utils/nodemailer.utils";
import '../utils/strategies/google';
import passport from "passport";

const router: Router = Router();

const cookiesOptions: CookieOptions = {
    httpOnly: true,
    sameSite: 'strict',
    // domain:"",
    secure: process.env.status === 'dev' ? false : true,
}

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "missing a required field" });
    if (!isEmail(email) || !isStrongPassword(password)) return res.status(400).json({ message: "invalid email or password" });
    try {
        const user: User | null = await prisma.user.findFirst({ where: { email, google_id: null } });
        if (!user) return res.status(401).json({ message: "invalid email or password" });
        if (!(await compare(password, user.password as string))) return res.status(401).json({ message: "invalid email or password" });
        const { accessToken, refreshToken } = generateTokens({ id: user.id });
        res.cookie('access', accessToken, { ...cookiesOptions, maxAge: 1000 * 60 * 15 });
        res.cookie('refresh', refreshToken, { ...cookiesOptions, maxAge: 1000 * 3600 * 24 * 7 });
        return res.status(200).json({ message: "user login successful" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "an error occurred while logging in the user" });
    }

})


router.post('/register', async (req: Request, res: Response) => {
    try {
        const { email, password, confirm, given_name, family_name, nickname, phone } = req.body;
        if (!email || !password || !confirm || !given_name || !family_name || !phone) return res.status(400).json({ message: "missing a required field" });
        if (!isEmail(email)) return res.status(400).json({ message: "you must provide a valid email" });
        if (!isStrongPassword(password)) return res.status(400).json({ message: "password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character" });
        if (!(password === confirm)) return res.status(400).json({ message: "passwords do not match" });
        if (!isPhoneNumber(phone)) return res.status(400).json({ message: "you must provide a valid phone number" });
        const user = await prisma.user.findUnique({ where: { email } });
        if (user) return res.status(400).json({ message: "email is already in use" });
        const newUser = await prisma.user.create({ select: { profile: true, email: true }, data: { email, password: await hash(password, 12), profile: { create: { family_name, given_name, nickname: nickname || null, phone, cart: { create: {} } } } } })
        res.status(201).json({ msg: "user registered successfully", user: newUser });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "an error occurred while registering the user" });
    }

})


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/google/callback', (req, res, next) => {
    passport.authenticate('google', (err: Error | any, user: any) => {
        if (err) {
            return res.status(500).json({ message: err || "error ocured while loging the user" })
        }
        console.log(user)
        req.login(user, (err) => {
            if (err) {
                return res.status(500).json({ message: "error ocured while loging the user" })
            }

        })
        next()

    })(req, res, next)
}, (req, res) => res.redirect("http://localhost:5417/"))


router.post('/reset/request', async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email || !isEmail(email)) return res.status(400).json({ message: "invalid email provided" });
    try {
        const user = await prisma.user.findFirst({ where: { email, google_id: null } });
        if (!user) return res.status(404).json({ message: "can not find an account with this email" });
        const resetSecret = process.env.RESET_SECRET || null;
        if (!resetSecret) return res.status(500).json({ message: "reset secret not set" });
        const resetToken = jwt.sign({ email }, resetSecret, { expiresIn: "15m" });
        const url = `http://localhost:5473/reset?${resetToken}`;
        const emailTemplate = `

        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
        }
        .header img {
            max-width: 150px;
        }
        .content {
            font-size: 16px;
            line-height: 1.5;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            font-weight: bold;
            color: #ffffff;
            background-color: #007bff;
            text-decoration: none;
            border-radius: 4px;
            text-align: center;
        }
        .footer {
            text-align: center;
            padding-top: 20px;
            font-size: 12px;
            color: #888;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <!-- Optional: Add your logo or company name here -->
        </div>
        <div class="content">
            <p>Hello Dear,</p>
            <p>We received a request to reset your password. You can reset your password using the link below:</p>
            <p><a href="${url}" class="button">Reset Password</a></p>
            <p>If you did not request this change, you can ignore this email.</p>
            <p>Best regards,<br>The IBDEV Team</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 IBDEV_STORE. All rights reserved.</p>
            <p><a href="[Unsubscribe Link]" style="color: #007bff;">Unsubscribe</a></p>
        </div>
    </div>
</body>
</html>
        
        `
        const isSent = await sendMail({
            from: "IBDEV|STORE",
            to: email,
            subject: "Reset Password Request",
            html: emailTemplate,
        })



        isSent ? res.status(200).json({ message: "reset password request sent successfully check your email" }) : res.status(500).json({ message: "reset password request failed" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "an error occurred while sending the reset password request" });
    }
})

router.get('/reset/check', async (req, res) => {
    const { token } = req.query;
    if (!token) return res.status(400).json({ message: "invalid or expired token" });
    try {
        const resetSecret = process.env.RESET_SECRET || null;
        if (!resetSecret) return res.status(500).json({ message: "reset secret not set" });
        const decoded = jwt.verify(token as string, resetSecret);
        if (!decoded) return res.status(400).json({ message: "invalid or expired token" });
        res.status(200).json({ message: "token is valid" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "invalid or expired token" });
    }
});

router.post('/reset/change', async (req, res) => {
    const { password, confirm } = req.body;
    const token: string | null = req.query.token as string || null;

    if (!token) return res.status(400).json({ message: "no token provided" });
    if (!password || !isStrongPassword(password)) return res.status(400).json({ message: "password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character" });
    if (password !== confirm) return res.status(400).json({ message: "password does not match" });

    try {

        const resetSecret = process.env.RESET_SECRET || null;
        if (!resetSecret) return res.status(500).json({ message: "reset secret not set" });
        const decoded: { email: string } = jwt.verify(token as string, resetSecret) as { email: string };
        if (!decoded) return res.status(400).json({ message: "invalid or expired token" });
        const user = await prisma.user.findFirst({ where: { email: decoded.email } });
        if (!user) return res.status(404).json({ message: "user not found" });
        await prisma.user.update({ where: { email: decoded.email }, data: { password: await hash(password, 12) } });
        return res.status(200).json({ message: "pasword reset successful" });

    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "an error occurred while resetting the password" });
    }
})

router.get('/logout', (req: Request, res: Response) => {
    res.cookie('access', null);
    res.cookie('refresh', null);
    req.logOut({ keepSessionInfo: false }, (err) => {
        if (err) return res.status(500).json({ message: "an error occurred while logging out" });
    });
    return res.status(200).json({ message: "logout successful" });
})
export default router;