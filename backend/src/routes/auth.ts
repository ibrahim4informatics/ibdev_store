import { Router, Request, Response, NextFunction, CookieOptions } from "express";
import { generateTokens } from '../utils/auth.utils';
import { userAuthStatus, userLocalLogin, userLocalRegister, userLogout, userResetChangePassword, userResetPassword, userValidateResetToken } from "../controllers/authController";
import isAuth from "../midlewares/isAuth";
import passport from "passport";
import '../utils/strategies/google';
const router: Router = Router();
const cookiesOptions: CookieOptions = {
    httpOnly: true,
    sameSite: 'strict',
    // domain:"",
    secure: process.env.status === 'dev' ? false : true,
}
router.post('/login', userLocalLogin)
router.post('/register', userLocalRegister)
router.post('/reset/request', userResetPassword)
router.get('/reset/check', userValidateResetToken);
router.post('/reset/change', userResetChangePassword)
router.get('/logout', isAuth, userLogout)
router.get('/status', isAuth, userAuthStatus)
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }))
router.get('/google/callback', (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('google', (err: Error | any, user: any) => {
        if (err) {
            return res.status(500).json({ message: err || "error ocured while loging the user" })
        }
        const { accessToken, refreshToken } = generateTokens({ id: user.id });
        res.cookie('access', accessToken, { ...cookiesOptions, maxAge: 1000 * 60 * 15 });
        res.cookie('refresh', refreshToken, { ...cookiesOptions, maxAge: 1000 * 3600 * 24 * 7 });
        return next()

    })(req, res, next)
},
    (req, res) => res.redirect("http://localhost:5173/")

)
export default router;