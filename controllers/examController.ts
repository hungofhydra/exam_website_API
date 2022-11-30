import { StatusCodes } from 'http-status-codes';
import { IExam } from '../models/Exam.js';
import {
  createNewExamService,
  getAllExamService,
  getExamService,
  inputExamScoreService,
} from '../services/examServices.js';

export const getAllExam = async (req, res, next) => {
  try {
    const exams = await getAllExamService();
    if (exams)
      return res.status(StatusCodes.OK).json({ success: 'true', exams });
  } catch (error) {
    next(error);
  }
};

export const getExam = async (req, res, next) => {
  const { examId }: { examId: string } = req.params;
  const { _id: studentid }: { _id: string } = req.user;
  try {
    const exam = await getExamService(examId, studentid);
    if (exam) return res.status(StatusCodes.OK).json({ success: 'true', exam });
  } catch (error) {
    next(error);
  }
};

export const createNewExam = async (req, res, next) => {
  const examData: IExam = req.body;
  try {
    const exam = await createNewExamService(examData);
    if (exam) return res.status(StatusCodes.OK).json({ success: 'true', exam });
  } catch (error) {
    next(error);
  }
};

export const inputExamScore = async (req, res, next) => {
  const { examId, score }: { examId: string; score: number } = req.body;
  const { _id: studentId }: { _id: string } = req.user;

  try {
    const studentExam = await inputExamScoreService(examId, score, studentId);
    if (studentExam) res.status(200).json({ success: 'true', studentExam });
  } catch (error) {
    next(error);
  }
};
