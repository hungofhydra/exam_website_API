import { StatusCodes } from 'http-status-codes';
import { createNewQuestionsService } from '../services/questionServices.js';
export const createNewQuestions = async (req, res, next) => {
    const questionData = req.body;
    try {
        const newQuestion = await createNewQuestionsService(questionData);
        if (newQuestion)
            return res.status(StatusCodes.OK).json({ success: 'true', newQuestion });
    }
    catch (error) {
        next(error);
    }
};
