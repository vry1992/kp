import { api } from '../../../services/api';

// {
//   "ship_id": "cl7ww5ppb000140vc9gwz2sna",
//   "ship_name": "Адмирал Макаров",
//   "ship_bort_number": "499",
//   "ship_project": "1135",
//   "ship_type": "frkrz",
//   "ship_city": "Севастополь"
// }[]
const getShips = async () => {
  const { data } = await api.get('ship/all');
  return data;
};

const apiPostShip = async (body) => {
  await api.post('/ship', body);
};

export const ShipService = {
  getShips,
  apiPostShip
};
