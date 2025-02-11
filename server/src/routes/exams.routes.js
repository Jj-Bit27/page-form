import express from 'express';
import {
  getExams,
  getExam,
  addExam,
  editExam,
  deleteExam
} from '../controllers/exams.controller.js';

const router = express.Router();

router.get('/gets', getExams);
router.get('/get/:id', getExam);
router.post('/add', addExam);
router.put('/edit/:id', editExam);
router.delete('/delete/:id', deleteExam);

export default router;
