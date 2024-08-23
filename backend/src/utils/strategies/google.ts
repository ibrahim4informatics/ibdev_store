import passport from "passport";
import { Strategy as GoogleStrategy, StrategyOptions } from "passport-google-oauth2";
import prisma from '../../utils/db.utils';

const startegyOptions: StrategyOptions = {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    scope: ["profile", "email"]
}


passport.serializeUser((user: any, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await prisma.user.findUnique({ where: { id }, select: { email: true, id: true } });
        done(null, user);
    }
    catch (error) {
        done(error, null);
    }
});


passport.use(new GoogleStrategy(startegyOptions, async (accessToken, refreshToken, profile, done) => {

    try {
        const userExist = await prisma.user.findUnique({ where: { email: profile.email } });
        if (userExist && userExist.google_id) {
            return done(null, userExist, { message: "user login successful" });
        }

        else if (userExist && !userExist.google_id) {
            return done("this email can not be linked", null, { message: "user login failed" });
        }

        else {
            const user = await prisma.user.create({
                data: {
                    email: profile.email, google_id: profile.id,
                    profile: {
                        create: {
                            family_name: profile.name.familyName,
                            given_name: profile.name.givenName,
                            phone: '',
                            cart: { create: {} }
                        }
                    }
                }
            })
            return done(null, user, { message: "user created successfully" });
        }
    }
    catch (error) {
        console.error(error);
        return done(error, null, { message: 'error occurs while loging user' });
    }

}));