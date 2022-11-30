import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import dateFormat from 'dateformat';
import { createError } from '../errors/createError.js';
import Exam from '../models/Exam.js';
import Question from '../models/Question.js';
import Student from '../models/Student.js';
export const getExamService = async (examId, studentId) => {
    const exam = await Exam.findById(examId);
    if (!exam)
        throw createError(StatusCodes.INTERNAL_SERVER_ERROR, 'Something bad happened in database');
    const student = await Student.findById(studentId);
    const isFinishedThisExam = student.examScore.find((o) => o.examId.toString() === examId);
    if (isFinishedThisExam)
        throw createError(StatusCodes.UNAUTHORIZED, 'This student had already done this exam');
    const questionIds = await Question.aggregate([
        {
            $sample: {
                size: exam.numberOfQuestion,
            },
        },
        {
            $group: {
                _id: '$_id',
                result: { $push: '$$ROOT' },
            },
        },
        {
            $replaceRoot: {
                newRoot: { $first: '$result' },
            },
        },
        { $project: { _id: 1 } },
    ]);
    exam.questions = questionIds;
    await exam.populate('questions');
    return exam;
};
export const createNewExamService = async (examData) => {
    const newExam = await Exam.create(Object.assign(Object.assign({}, examData), { startDate: dateFormat(new Date(examData.startDate), 'isoDateTime'), endDate: dateFormat(new Date(examData.endDate), 'isoDateTime') }));
    if (!newExam)
        throw createError(StatusCodes.INTERNAL_SERVER_ERROR, getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
    return newExam;
};
export const getAllExamService = async () => {
    const exams = await Exam.find().select('-questions');
    return exams;
};
