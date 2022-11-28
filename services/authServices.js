import bcrypt from 'bcryptjs';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import Student from '../models/Student.js';
import { createError } from '../errors/createError.js';
export const createNewStudentAccountService = async (studentData) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(studentData.password, salt);
    const newStudent = await Student.create(Object.assign(Object.assign({}, studentData), { password: hashedPassword }));
    if (!newStudent)
        throw createError(StatusCodes.INTERNAL_SERVER_ERROR, getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
    const token = await newStudent.createJWT();
    newStudent.password = undefined;
    return { token, newStudent };
};
export const signInService = async (username, password) => {
    if (!username || !password)
        throw createError(StatusCodes.BAD_REQUEST, 'Please provide username and password');
    const studentResult = await Student.findOne({ username });
    if (!studentResult)
        throw createError(StatusCodes.NOT_FOUND, 'User not found');
    const isPasswordMatched = await studentResult.comparePassword(password);
    if (!isPasswordMatched)
        throw createError(StatusCodes.UNAUTHORIZED, 'Password is incorrect');
    const token = await studentResult.createJWT();
    studentResult.password = undefined;
    return { token, studentResult };
};
export const logoutService = async (username) => {
    if (!username)
        throw createError(StatusCodes.BAD_REQUEST, 'Please provide username');
    const student = await Student.findOne({ username });
    if (student) {
        await student.logout();
        return true;
    }
    throw createError(StatusCodes.NOT_FOUND, 'User not found');
};
