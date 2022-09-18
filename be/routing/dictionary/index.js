import express from 'express';
import { initDictionary } from './listeners.js';

const dictionaryRouter = express.Router();

dictionaryRouter.get('/', initDictionary);

export { dictionaryRouter }