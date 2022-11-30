import express from 'express';
import {
  createNewExam,
  getAllExam,
  getExam,
} from '../controllers/examController.js';
import { studentAuthentication } from '../middlewares/studentAuthentication.js';
import { teacherAuthentication } from '../middlewares/teacherAuthentication.js';

const router = express.Router();

router.get('/:examId', studentAuthentication, getExam);
router.get('/', getAllExam);
router.post('/', teacherAuthentication, createNewExam);

export const examRoute = router;
