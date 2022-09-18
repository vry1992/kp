import { msInMonth } from '../constants';

export const coordinatesConverter = (deg = 0, min = 0) => {
  return deg + min / 60;
};

export const getDefaultDateFrom = () => {
  const now = Date.now();
  return {
    value: new Date(now - msInMonth).toLocaleDateString(),
    dateMS: now - msInMonth
  };
};

export const getDefaultDateTo = () => {
  return {
    value: new Date().toLocaleDateString(),
    dateMS: Date.now()
  };
};

export const getSelectOptionsFromArray = (array) => {
  return array.map((item) => ({ key: item, label: item }));
};

export const parseDate = (timestamp) => new Date(timestamp).toLocaleString();
