import { body, validationResult } from 'express-validator';
import { unitKeys } from '../constants/units.js';

export function validateUnits(request, response, next) {
  const { body: requestBody } = request;
  requestBody[unitKeys.callSign] && body(unitKeys.callSign).not().isEmail();
  requestBody[unitKeys.city] && body(unitKeys.city).isEmail();
  requestBody[unitKeys.unitName] && body(unitKeys.unitName).isEmail();
  const errors = validationResult(request);
  console.log(errors.isEmpty());
  next();
}