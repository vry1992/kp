import express from 'express';
import { unitRouter } from './routing/unit/index.js';
import { shipRouter } from './routing/ship/index.js';
import { dictionaryRouter } from './routing/dictionary/index.js';

import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());

app.use('/unit', unitRouter);
app.use('/ship', shipRouter);
app.use('/dictionary', dictionaryRouter);












app.listen(4000, () => {
  console.log('ok');
})