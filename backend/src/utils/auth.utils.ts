
import { Request } from "express";
import jwt from 'jsonwebtoken';
interface AuthRequest extends Request {
    user?: { id: string };
}
const getSecrets = (): { accessSecret: string | null, refreshSecret: string | null } => {
    const accessSecret: string | null = process.env.ACCESS_SECRET || null;
    const refreshSecret: string | null = process.env.REFRESH_SECRET || null;
    return { accessSecret, refreshSecret }
}

const generateTokens = (payload: { id: string }): { accessToken: string | null, refreshToken: string | null, err: string | null } => {
    try {
        const { accessSecret, refreshSecret } = getSecrets();
        if (!accessSecret || !refreshSecret) {
            return { err: "Access or refresh secret not found", accessToken: null, refreshToken: null }
        }
        const accessToken = jwt.sign(payload, accessSecret, { expiresIn: "15m" });
        const refreshToken = jwt.sign(payload, refreshSecret, { expiresIn: "7d" });
        return { accessToken, refreshToken, err: null }
    }
    catch (err) {
        console.log(err)
        return { err: "error occured when generating the tokens", accessToken: null, refreshToken: null }
    }
}
const verifyAccessToken = (token: string): { id: string } | null => {
    try {
        const { accessSecret } = getSecrets();
        if (!accessSecret) return null;
        const payload = jwt.verify(token, accessSecret) as { id: string };
        return payload;

    }
    catch (err) {
        return null;
    }
}
const refreshTokens = (refreshToken: string): string | null => {
    try {
        const { accessSecret, refreshSecret } = getSecrets()
        if (!refreshSecret || !accessSecret) return null;
        const payload = jwt.verify(refreshToken, refreshSecret) as { id: string };
        const accessToken = jwt.sign({ id: payload.id }, accessSecret, { expiresIn: "15m" });
        return accessToken;
    }
    catch (err) {
        console.log(err)
        return null;
    }

}
export {
    generateTokens, AuthRequest, verifyAccessToken, refreshTokens, getSecrets
}