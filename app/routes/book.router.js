import express from 'express';
import { create, findAll, findBookById } from '../controllers/book.controller.js';

export const router = express.Router()

router.post('/', create);
router.get('/', findAll)
router.get('/:id', findBookById)

