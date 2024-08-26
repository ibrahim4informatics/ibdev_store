import express, { Request, Express } from 'express';
//? midlewares imports
import cors, { CorsOptions } from 'cors';
import fileUpload, { Options } from 'express-fileupload';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path'
//? router imports
import authRouter from './routes/auth';
import adminRouter from './routes/admin'
import isAuth from './midlewares/isAuth';
import isAdmin from './midlewares/isAdmin';


//? constants for initializing express app  
const app: Express = express();
const port: number = Number.parseInt(process.env.PORT as string) || 3000;
const corsOption: CorsOptions = { origin: 'http://localhost:5173', credentials: true }


//? using middlewares
app.use(cors(corsOption));
app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(passport.initialize());

app.use(morgan("common", {stream:  fs.createWriteStream(path.join(__dirname, 'logs', 'log.txt'), {flags:'a'})  }));
//?using routers
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/admin', isAuth, isAdmin,adminRouter);



app.listen(port, () => { console.log(`server listening on http://localhost:${port}`) });