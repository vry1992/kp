import * as yup from 'yup';
import {
  getUnitNameSchema,
  getCitySchema,
  getCallSignSchema,
  getShipNameSchema,
  getBortNumberSchema,
  getProjectSchema,
  getShipTypeSchema,
  getPelengSchema,
  getSearchSchema,
  getDateSchema,
  getTimeSchema,
  getLatitudeDegsSchema,
  getLatitudeMinsSchema,
  getLongitudeDegsSchema,
  getLongitudeMinsSchema,
  getFrequencySchema,
  getPersonNameAndInitialsSchema,
  getTextAreaSchema
} from './schemas';

export function useValidation(fieldsToValdate = {}) {
  const validationSchema = yup.object().shape({
    ...(fieldsToValdate.unitName && {
      unitName: getUnitNameSchema(fieldsToValdate.unitName.required)
    }),
    ...(fieldsToValdate.city && { city: getCitySchema(fieldsToValdate.city.required) }),
    ...(fieldsToValdate.callSign && {
      callSign: getCallSignSchema(fieldsToValdate.callSign.required)
    }),
    ...(fieldsToValdate.shipName && {
      shipName: getShipNameSchema(fieldsToValdate.shipName.required)
    }),
    ...(fieldsToValdate.bortNumber && {
      bortNumber: getBortNumberSchema(fieldsToValdate.bortNumber.required)
    }),
    ...(fieldsToValdate.project && { project: getProjectSchema(fieldsToValdate.project.required) }),
    ...(fieldsToValdate.shipType && {
      shipType: getShipTypeSchema(fieldsToValdate.shipType.required)
    }),
    ...(fieldsToValdate.dutyManRank && {
      dutyManRank: getShipTypeSchema(fieldsToValdate.dutyManRank.required)
    }),
    ...(fieldsToValdate.peleng && { peleng: getPelengSchema(fieldsToValdate.peleng.required) }),
    ...(fieldsToValdate.search && { search: getSearchSchema(fieldsToValdate.search.required) }),
    ...(fieldsToValdate.time && { time: getTimeSchema(fieldsToValdate.time.required) }),
    ...(fieldsToValdate.date && { date: getDateSchema(fieldsToValdate.date.required) }),
    ...(fieldsToValdate.latitudeDegs && {
      latitudeDegs: getLatitudeDegsSchema(fieldsToValdate.latitudeDegs.required)
    }),
    ...(fieldsToValdate.latitudeMinutes && {
      latitudeMinutes: getLatitudeMinsSchema(fieldsToValdate.latitudeMinutes.required)
    }),
    ...(fieldsToValdate.longitudeDegs && {
      longitudeDegs: getLongitudeDegsSchema(fieldsToValdate.longitudeDegs.required)
    }),
    ...(fieldsToValdate.longitudeMinutes && {
      longitudeMinutes: getLongitudeMinsSchema(fieldsToValdate.longitudeMinutes.required)
    }),
    ...(fieldsToValdate.shipCallsign && {
      shipCallsign: getCallSignSchema(fieldsToValdate.shipCallsign.required)
    }),
    ...(fieldsToValdate.companionCallsign && {
      companionCallsign: getCallSignSchema(fieldsToValdate.companionCallsign.required)
    }),
    ...(fieldsToValdate.frequency && {
      frequency: getFrequencySchema(fieldsToValdate.frequency.required)
    }),
    ...(fieldsToValdate.personName && {
      personName: getPersonNameAndInitialsSchema(fieldsToValdate.personName.required)
    }),
    ...(fieldsToValdate.dutyManFullName && {
      dutyManFullName: getPersonNameAndInitialsSchema(fieldsToValdate.dutyManFullName.required)
    }),
    ...(fieldsToValdate.additionalInformation && {
      additionalInformation: getTextAreaSchema(fieldsToValdate.additionalInformation.required)
    })
  });

  return { validationSchema };
}
