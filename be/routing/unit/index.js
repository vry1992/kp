import express from 'express';
import { validateUnits } from '../../middleware/validation.js';
import { postUnit } from './listeners.js';

const unitRouter = express.Router();

unitRouter.post('/', [validateUnits], postUnit);

export { unitRouter }