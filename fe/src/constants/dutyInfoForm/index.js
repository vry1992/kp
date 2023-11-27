export const getRanksOptions = () => {
  return [
    {
      key: 'lt',
      label: 'лейтенант'
    },
    {
      key: 'stlt',
      label: 'старший лейтенант'
    },
    {
      key: 'kn',
      label: 'капітан-лейтенант'
    },
    {
      key: 'kn3',
      label: 'капітан 3 рангу'
    }
  ];
};

export const dutyInfoFormConfig = {
  dutyManRank: {
    type: 'select',
    multiple: false,
    placeholder: 'Військове звання',
    label: 'Військове звання',
    fieldName: 'dutyManRank',
    required: true,
    options: getRanksOptions()
  },
  dutyManFullName: {
    type: 'text',
    placeholder: 'Прізвище та ініціали чергового, наприклад Петров П.П.',
    label: 'Прізвище та ініціали чергового, наприклад Петров П.П.',
    fieldName: 'dutyManFullName',
    required: true
  },
  dutyStartDate: {
    type: 'date',
    placeholder: 'Дата заступання',
    label: 'Дата заступання',
    fieldName: 'dutyStartDate',
    columnWidth: 5,
    required: true
  }
};
