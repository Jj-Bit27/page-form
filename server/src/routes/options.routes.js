import express from 'express';
import {
  getOptions,
  addOption,
  editOption,
  deleteOption
} from '../controllers/options.controller.js';

const router = express.Router();

router.get('/gets/:id_pregunta', getOptions);
router.post('/add/:id_pregunta', addOption);
router.put('/edit/:id', editOption);
router.delete('/delete/:id', deleteOption);

export default router;
