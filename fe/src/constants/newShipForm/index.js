import { shipTypes } from '..';

const getTypesOptions = () => {
  const sortedByAlphabet = Object.values(shipTypes).sort((a, b) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  });
  return sortedByAlphabet.map(({ type, name }) => ({ key: type, label: name }));
};

export const newShipFormConfig = {
  shipName: {
    type: 'text',
    placeholder: 'Назва корабля',
    label: 'Назва корабля',
    fieldName: 'shipName',
    required: true
  },
  bortNumber: {
    type: 'text',
    placeholder: 'Бортовий номер',
    label: 'Бортовий номер',
    fieldName: 'bortNumber',
    required: true
  },
  project: {
    type: 'text',
    placeholder: 'Проект',
    label: 'Проект',
    fieldName: 'project',
    required: true
  },
  shipType: {
    type: 'select',
    multiple: false,
    placeholder: 'Тип',
    label: 'Тип',
    fieldName: 'shipType',
    required: true,
    options: getTypesOptions()
  },
  shipUnit: {
    type: 'select',
    placeholder: 'Підрозділ',
    label: 'Підрозділ',
    fieldName: 'shipUnit',
    required: true,
    options: []
  },
  city: {
    type: 'text',
    placeholder: 'Місто базування',
    label: 'Місто базування',
    fieldName: 'city',
    required: true
  }
};
