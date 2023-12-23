import { api } from '../../../services/api';

// {
//   "ship_id": "cl7ww5ppb000140vc9gwz2sna",
//   "ship_name": "Адмирал Макаров",
//   "ship_bort_number": "499",
//   "ship_project": "1135",
//   "ship_type": "frkrz",
//   "ship_city": "Севастополь"
// }[]
const postData = async (body) => {
  const { data } = await api.post('aircraft', body);
  return data;
};

const patchData = async (body) => {
  const { data } = await api.patch('aircraft', body);
  return data;
};

const filterData = async (body) => {
  const { data } = await api.post('aircraft/filter/planes', body);
  return data;
};

const getOne = async (id) => {
  const { data } = await api.get(`aircraft/${id}`);
  return data;
};

const deleteOne = async (id) => {
  await api.delete(`aircraft/${id}`);
};

export const AircraftService = {
  postData,
  filterData,
  getOne,
  patchData,
  deleteOne
};
