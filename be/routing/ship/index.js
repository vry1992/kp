import express from 'express';
import { postShip, postSearchShipByKeyWord, postShipData, filterShipData } from './listeners.js';

const shipRouter = express.Router();

shipRouter.post('/', postShip);
shipRouter.post('/search', postSearchShipByKeyWord);
shipRouter.post('/add-data', postShipData);
shipRouter.post('/filter', filterShipData)

export { shipRouter }