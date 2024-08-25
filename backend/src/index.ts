import express, { Response, Request, Express } from 'express';
//? midlewares imports
import cors, { CorsOptions } from 'cors';
import fileUpload, { Options } from 'express-fileupload';
import helmet from 'helmet';
import expressSession, { SessionOptions } from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path'
//? router imports
import authRouter from './routes/auth';


//? constants for initializing express app  
const app: Express = express();
const port: number = Number.parseInt(process.env.PORT as string) || 3000;
const corsOption: CorsOptions = { origin: 'http://localhost:5173', credentials: true }
const fileUploadOptions: Options = {}
const sessionOptions: SessionOptions = { secret: 'sss1', resave: false, saveUninitialized: false, cookie: { secure: false } };


//? using middlewares
app.use(cors(corsOption));
app.use(express.json());
app.use(fileUpload(fileUploadOptions));
app.use(helmet());
app.use(expressSession(sessionOptions));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan("common", {stream:  fs.createWriteStream(path.join(__dirname, 'logs', 'log.txt'), {flags:'a'})  }));
//?using routers
app.use('/api/v1/auth', authRouter);



app.listen(port, () => { console.log(`server listening on http://localhost:${port}`) });