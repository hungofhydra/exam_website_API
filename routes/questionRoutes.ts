import express from 'express';
import { createNewQuestions } from '../controllers/questionController.js';
import { teacherAuthentication } from '../middlewares/teacherAuthentication.js';

const router = express.Router();

router.post('/create/', teacherAuthentication, createNewQuestions);

export const questionRoute = router;
