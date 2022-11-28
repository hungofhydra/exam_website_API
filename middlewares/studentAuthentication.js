import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { createError } from '../errors/createError.js';
export const studentAuthentication = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer'))
        throw createError(StatusCodes.UNAUTHORIZED, 'Authentication invalid, require token');
    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            username: payload.username,
            fullName: payload.fullName,
            mssv: payload.mssv,
            class: payload.class,
            _id: payload._id,
        };
        next();
    }
    catch (error) {
        throw createError(StatusCodes.UNAUTHORIZED, 'Authentication invalid at token');
    }
};
