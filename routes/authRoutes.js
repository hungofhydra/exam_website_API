import express from 'express';
import { createNewStudentAccount, logout, signIn, } from '../controllers/authController.js';
const router = express.Router();
router.post('/signup', createNewStudentAccount);
router.post('/signin', signIn);
router.post('/logout', logout);
export const authRouter = router;
