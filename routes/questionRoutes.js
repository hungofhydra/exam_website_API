import express from 'express';
import { createNewQuestions, createNewQuestionsFromExcelFile, } from '../controllers/questionController.js';
import { teacherAuthentication } from '../middlewares/teacherAuthentication.js';
const router = express.Router();
router.post('/create/', teacherAuthentication, createNewQuestions);
router.post('/createExcel/', teacherAuthentication, createNewQuestionsFromExcelFile);
export const questionRoute = router;
