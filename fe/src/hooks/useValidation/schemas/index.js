import * as yup from 'yup';
import {
  errorFieldMessage,
  unitNameRegexp,
  requiredFieldMessage,
  cityRegexp,
  callSignRegexp,
  shipNameRegexp,
  bortNumberRegexp,
  projectRegexp,
  errorMinPeleng,
  errorMaxPeleng,
  errorMinlatDeg,
  errorMaxlatDeg,
  errorMinlatMins,
  errorMaxlatMins,
  errorMinLngDeg,
  errorMaxLngDeg,
  errorMinLngMins,
  errorMaxLngMins,
  frequencyRegexp,
  errorFrequency,
  personNameAndInitialsRegexp,
  textAreaRegexp
} from '../../../constants/validation';

const getUnitNameSchema = (required) => {
  const schema = yup.string().matches(unitNameRegexp, errorFieldMessage);

  return required ? schema.required(requiredFieldMessage) : schema.notRequired();
};

const getCitySchema = (required) => {
  const schema = yup.string().matches(cityRegexp, errorFieldMessage);

  return required ? schema.required(requiredFieldMessage) : schema.notRequired();
};

const getCallSignSchema = (required) => {
  const schema = yup.string().matches(callSignRegexp, errorFieldMessage);

  return required ? schema.required(requiredFieldMessage) : schema.notRequired();
};

const getShipNameSchema = (required) => {
  const schema = yup.string().matches(shipNameRegexp, errorFieldMessage);

  return required ? schema.required(requiredFieldMessage) : schema.notRequired();
};

const getBortNumberSchema = (required) => {
  const schema = yup.string().matches(bortNumberRegexp, errorFieldMessage);

  return required ? schema.required(requiredFieldMessage) : schema.notRequired();
};

const getProjectSchema = (required) => {
  const schema = yup.string().matches(projectRegexp, errorFieldMessage);

  return required ? schema.required(requiredFieldMessage) : schema.notRequired();
};

const getShipTypeSchema = (required) => {
  const schema = yup.string();

  return required ? schema.required(requiredFieldMessage) : schema.notRequired();
};

const getPelengSchema = (required) => {
  const schema = yup.number().min(0, errorMinPeleng).max(360, errorMaxPeleng);

  return required ? schema.required(requiredFieldMessage) : schema.notRequired();
};

const getSearchSchema = (required) => {
  const schema = yup.string().nullable().matches(shipNameRegexp, errorFieldMessage);

  return required ? schema.required(requiredFieldMessage) : schema.notRequired();
};

const getDateSchema = (required) => {
  const schema = yup.string();

  return required ? schema.required(requiredFieldMessage) : schema.notRequired();
};

const getTimeSchema = (required) => {
  const schema = yup.string();

  return required ? schema.required(requiredFieldMessage) : schema.notRequired();
};

const getLatitudeDegsSchema = (required) => {
  const schema = yup.number().min(-90, errorMinlatDeg).max(90, errorMaxlatDeg);

  return required ? schema.required(requiredFieldMessage) : schema.notRequired();
};

const getLatitudeMinsSchema = () => {
  const schema = yup
    .number()
    .min(0, errorMinlatMins)
    .max(60, errorMaxlatMins)
    .when('latitudeDegs', {
      is: (value) => !isNaN(value),
      then: (rule) => rule.required(requiredFieldMessage),
      otherwise: (rule) => rule.notRequired()
    });

  return schema;
};

const getLongitudeDegsSchema = (required) => {
  const schema = yup.number().min(0, errorMinLngDeg).max(180, errorMaxLngDeg);

  return required ? schema.required(requiredFieldMessage) : schema.notRequired();
};

const getLongitudeMinsSchema = () => {
  const schema = yup
    .number()
    .min(0, errorMinLngMins)
    .max(60, errorMaxLngMins)
    .when('longitudeDegs', {
      is: (value) => !isNaN(value),
      then: (rule) => rule.required(requiredFieldMessage),
      otherwise: (rule) => rule.notRequired()
    });

  return schema;
};

const getFrequencySchema = (required) => {
  const schema = yup.string().matches(frequencyRegexp, errorFrequency);

  return required ? schema.required(requiredFieldMessage) : schema.notRequired();
};

const getPersonNameAndInitialsSchema = (required) => {
  const schema = yup.string().matches(personNameAndInitialsRegexp, errorFieldMessage);

  return required ? schema.required(requiredFieldMessage) : schema.notRequired();
};

const getTextAreaSchema = (required) => {
  const schema = yup.string().matches(textAreaRegexp, errorFieldMessage);

  return required ? schema.required(requiredFieldMessage) : schema.notRequired();
};

export {
  getUnitNameSchema,
  getCitySchema,
  getCallSignSchema,
  getShipNameSchema,
  getBortNumberSchema,
  getProjectSchema,
  getShipTypeSchema,
  getPelengSchema,
  getSearchSchema,
  getTimeSchema,
  getDateSchema,
  getLatitudeDegsSchema,
  getLatitudeMinsSchema,
  getLongitudeDegsSchema,
  getLongitudeMinsSchema,
  getFrequencySchema,
  getPersonNameAndInitialsSchema,
  getTextAreaSchema
};
