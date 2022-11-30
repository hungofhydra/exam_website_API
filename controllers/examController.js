import { StatusCodes } from 'http-status-codes';
import { createNewExamService, getAllExamService, getExamService, } from '../services/examServices.js';
export const getAllExam = async (req, res, next) => {
    try {
        const exams = await getAllExamService();
        if (exams)
            return res.status(StatusCodes.OK).json({ success: 'true', exams });
    }
    catch (error) {
        next(error);
    }
};
export const getExam = async (req, res, next) => {
    const { examId } = req.params;
    const { _id: studentid } = req.user;
    try {
        const exam = await getExamService(examId, studentid);
        if (exam)
            return res.status(StatusCodes.OK).json({ success: 'true', exam });
    }
    catch (error) {
        next(error);
    }
};
export const createNewExam = async (req, res, next) => {
    const examData = req.body;
    try {
        const exam = await createNewExamService(examData);
        if (exam)
            return res.status(StatusCodes.OK).json({ success: 'true', exam });
    }
    catch (error) {
        next(error);
    }
};
