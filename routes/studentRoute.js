import express from 'express';
import { getStudentInformation } from '../controllers/studentController.js';
const router = express.Router();
router.get('/:studentId', getStudentInformation);
export const studentRoute = router;
