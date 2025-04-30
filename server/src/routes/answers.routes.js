import express from 'express';
import {
  getAnswers,
  addAnswer,
  editAnswer,
  deleteAnswer
} from '../controllers/answers.controller.js';

const router = express.Router();

router.get('/gets/:id_examen', getAnswers);
router.post('/add', addAnswer);
router.put('/edit/:id', editAnswer);
router.delete('/delete/:id', deleteAnswer);

export default router;
