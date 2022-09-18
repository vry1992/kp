export const searchFormFields = {
  dateFrom: {
    type: 'date',
    placeholder: 'Дата від якої почати пошук',
    label: 'Дата від якої почати пошук',
    fieldName: 'dateFrom',
    columnWidth: 5
  },
  timeFrom: {
    type: 'time',
    placeholder: 'Час від якого починати пошук',
    label: 'Час від якого починати пошук',
    fieldName: 'timeFrom',
    columnWidth: 5
  },
  dateTo: {
    type: 'date',
    placeholder: 'Дата до якої здійснювати пошук',
    label: 'Дата до якої здійснювати пошук',
    fieldName: 'dateTo',
    columnWidth: 5
  },
  timeTo: {
    type: 'time',
    placeholder: 'Час до якого здійснювати пошук',
    label: 'Час до якого здійснювати пошук',
    fieldName: 'timeTo',
    columnWidth: 5
  },
  shipNameList: {
    type: 'select',
    multiple: true,
    placeholder: 'Оберіть назви кораблів',
    label: 'Оберіть назви кораблів',
    fieldName: 'shipNameList',
    autoComplete: 'off',
    columnWidth: 5,
    options: []
  },
  frequency: {
    type: 'text',
    placeholder: 'Частота на якій спостерігалось, наприклад 0000 або 123.456',
    label: 'Частота на якій спостерігалось, наприклад 0000 або 123.456',
    fieldName: 'frequency',
    columnWidth: 5
  },
  shipCallsignList: {
    type: 'select',
    multiple: true,
    placeholder: 'Оберіть позивні',
    label: 'Оберіть позивні',
    fieldName: 'shipCallsignList',
    autoComplete: 'off',
    columnWidth: 5,
    options: []
  },
  personNameList: {
    type: 'select',
    multiple: true,
    placeholder: 'Оберіть того хто добавив запис',
    label: 'Оберіть того хто добавив запис',
    fieldName: 'personNameList',
    columnWidth: 5,
    autoComplete: 'off',
    options: []
  }
};
