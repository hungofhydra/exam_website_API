import bcrypt from 'bcryptjs';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import Student, { IStudent } from '../models/Student.js';
import { createError } from '../errors/createError.js';

export const createNewStudentAccountService = async (
  studentData: IStudent
): Promise<{ token: string; newStudent: IStudent }> => {
  const salt: string = bcrypt.genSaltSync(10);
  const hashedPassword: string = bcrypt.hashSync(studentData.password, salt);

  const newStudent = await Student.create({
    ...studentData,
    password: hashedPassword,
  });

  if (!newStudent)
    throw createError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
    );

  const token: string = await newStudent.createJWT();
  newStudent.password = undefined;

  return { token, newStudent };
};

export const signInService = async (
  username: string,
  password: string
): Promise<{ token: string; studentResult: IStudent }> => {
  if (!username || !password)
    throw createError(
      StatusCodes.BAD_REQUEST,
      'Please provide username and password'
    );

  const studentResult: IStudent = await Student.findOne({ username });
  if (!studentResult)
    throw createError(StatusCodes.NOT_FOUND, 'User not found');

  const isPasswordMatched: boolean = await studentResult.comparePassword(
    password
  );
  if (!isPasswordMatched)
    throw createError(StatusCodes.UNAUTHORIZED, 'Password is incorrect');

  const token: string = await studentResult.createJWT();
  studentResult.password = undefined;
  return { token, studentResult };
};

export const logoutService = async (username: string): Promise<boolean> => {
  if (!username)
    throw createError(StatusCodes.BAD_REQUEST, 'Please provide username');

  const student: IStudent = await Student.findOne({ username });

  if (student) {
    await student.logout();
    return true;
  }
  throw createError(StatusCodes.NOT_FOUND, 'User not found');
};
