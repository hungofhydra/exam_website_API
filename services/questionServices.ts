import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import { createError } from '../errors/createError.js';
import Question, { IQuestion } from '../models/Question.js';

export const createNewQuestionsService = async (
  questionData: IQuestion[]
): Promise<IQuestion[]> => {
  const newQuestions: IQuestion[] = await Question.insertMany(questionData);
  if (!newQuestions)
    throw createError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
    );

  return newQuestions;
};
