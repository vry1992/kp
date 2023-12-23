import { api } from '../../../services/api';

const normalizePostUnitResponse = (data) => {
  return data.map(({ unit_id: unitId, unit_name: unitName }) => ({ unitId, unitName }));
};

const getUnits = async () => {
  const { data } = await api.get('/unit');
  return normalizePostUnitResponse(data);
};

const createNewUnit = async (body) => {
  const { data } = await api.post('/unit', body);
  return normalizePostUnitResponse(data);
};

export const UnitServices = {
  getUnits,
  createNewUnit
};
