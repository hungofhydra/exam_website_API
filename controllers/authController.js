import { StatusCodes } from 'http-status-codes';
import { createNewStudentAccountService, logoutService, signInService, } from '../services/authServices.js';
export const createNewStudentAccount = async (req, res, next) => {
    const studentData = req.body;
    try {
        const { token, newStudent } = await createNewStudentAccountService(studentData);
        if (token && newStudent)
            return res
                .status(StatusCodes.OK)
                .json({ success: 'true', token, newStudent });
    }
    catch (error) {
        next(error);
    }
};
export const signIn = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const { token, studentResult } = await signInService(username, password);
        if (token && studentResult)
            return res.status(StatusCodes.OK).json({
                success: 'true',
                token,
                studentResult,
            });
    }
    catch (error) {
        next(error);
    }
};
export const logout = async (req, res, next) => {
    const { username } = req.body;
    try {
        const success = await logoutService(username);
        if (success)
            return res.status(StatusCodes.OK).json({
                success,
            });
    }
    catch (error) {
        next(error);
    }
};
