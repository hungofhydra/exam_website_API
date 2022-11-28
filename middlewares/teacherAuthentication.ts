import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

import { createError } from '../errors/createError.js';

interface JwtPayLoad {
  username: string;
  fullName: string;
  mssv: string;
  class: string;
  roles: string[];
  _id: string;
}

export const teacherAuthentication = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer'))
    throw createError(
      StatusCodes.UNAUTHORIZED,
      'Authentication invalid, require token'
    );
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET) as JwtPayLoad;
    if (!payload.roles.includes('Teacher'))
      throw createError(
        StatusCodes.UNAUTHORIZED,
        'Authentication invalid at token, you are not a teacher'
      );
    req.user = {
      username: payload.username,
      fullName: payload.fullName,
      mssv: payload.mssv,
      class: payload.class,
      _id: payload._id,
    };
    next();
  } catch (error) {
    throw createError(
      StatusCodes.UNAUTHORIZED,
      'Authentication invalid at token'
    );
  }
};
