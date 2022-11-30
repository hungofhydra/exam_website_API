import { StatusCodes } from 'http-status-codes';
import { createError } from '../errors/createError.js';
import Student from '../models/Student.js';

export const getStudentInformationService = async (studentId: string) => {
  const student = await Student.findById(studentId).select(
    '-password -token -roles'
  );

  if (!student)
    throw createError(
      StatusCodes.NOT_FOUND,
      'There is no student with this id'
    );

  return student;
};
