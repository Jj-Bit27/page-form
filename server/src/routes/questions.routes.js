/* Importamos el paquete express */
import express from 'express';

/* Importamos otros archivos */
import {
  addQuestion,
  editQuestion,
  deleteQuestion,
  getQuestions,
  getQuestion,
  deleteQuestions
} from '../controllers/question.controller.js';
import { validateSchema } from '../middleware/validator.middleware.js'
import { questionSchema } from '../schemas/question.schema.js';

const router = express.Router();

router.post('/add', addQuestion);
router.put('/edit/:id', editQuestion);
router.delete('/delete/:id', deleteQuestion);
router.delete('/deletes/:id_examen', deleteQuestions);
router.get('/get/:id', getQuestion);
router.get('/gets/:id_examen', getQuestions);

export default router;