import { StatusCodes } from 'http-status-codes';

import { IStudent } from '../models/Student';
import {
  createNewStudentAccountService,
  logoutService,
  signInService,
} from '../services/authServices.js';

export const createNewStudentAccount = async (req, res, next) => {
  const studentData: IStudent = req.body;
  try {
    const { token, newStudent } = await createNewStudentAccountService(
      studentData
    );
    if (token && newStudent)
      return res
        .status(StatusCodes.OK)
        .json({ success: 'true', token, newStudent });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { username, password }: { username: string; password: string } =
    req.body;

  try {
    const { token, studentResult }: { token: string; studentResult: IStudent } =
      await signInService(username, password);

    if (token && studentResult)
      return res.status(StatusCodes.OK).json({
        success: 'true',
        token,
        studentResult,
      });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  const { username }: { username: string } = req.body;

  try {
    const success: boolean = await logoutService(username);
    if (success)
      return res.status(StatusCodes.OK).json({
        success,
      });
  } catch (error) {
    next(error);
  }
};
