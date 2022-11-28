import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { createError } from '../errors/createError.js';
import Question from '../models/Question.js';
export const createNewQuestionsService = async (questionData) => {
    const newQuestions = await Question.insertMany(questionData);
    if (!newQuestions)
        throw createError(StatusCodes.INTERNAL_SERVER_ERROR, getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
    return newQuestions;
};
