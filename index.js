import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import rateLimiter from 'express-rate-limit';
import 'express-async-errors';
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
app.use('/', (req, res) => {
    res.status(200).json('Hello World');
});
const start = async () => {
    try {
        //await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => console.log(' Connected to DB' + ` and is listening on port ${PORT}...`));
    }
    catch (error) {
        console.log(error);
    }
};
start();
