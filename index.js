import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import rateLimiter from 'express-rate-limit';
import 'express-async-errors';
import mongoose from 'mongoose';
import { errorHandler, notFound } from './middlewares/index.js';
import { authRouter, examRoute, questionRoute, studentRoute, } from './routes/index.js';
const PORT = process.env.PORT || 5000;
const app = express();
app.set('trust proxy', 1);
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
}));
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/question', questionRoute);
app.use('/api/v1/exam', examRoute);
app.use('/api/v1/student', studentRoute);
app.use(errorHandler);
app.use(notFound);
const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        app.listen(PORT, () => console.log(' Connected to DB' + ` and is listening on port ${PORT}...`));
    }
    catch (error) {
        console.log(error);
    }
};
start();
