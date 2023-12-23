export const shipInfoFields = {
  date: {
    type: 'datetime-local',
    placeholder: 'Виберіть дату та час',
    label: 'Виберіть дату та час',
    fieldName: 'date',
    required: true
  },
  shipCallsign: {
    type: 'text',
    placeholder: "Позивний під яким виходив на зв'язок",
    label: "Позивний під яким виходив на зв'язок",
    fieldName: 'shipCallsign',
    required: false,
    columnWidth: 5
  },
  companionCallsign: {
    type: 'text',
    placeholder: "Позивний того з ким виходив на зв'язок",
    label: "Позивний того з ким виходив на зв'язок",
    fieldName: 'companionCallsign',
    required: false,
    columnWidth: 5
  },
  frequency: {
    type: 'text',
    placeholder: 'Частота на якій спостерігалось, наприклад 0000 або 123.456',
    label: 'Частота на якій спостерігалось, наприклад 0000 або 123.456',
    fieldName: 'frequency',
    required: false,
    columnWidth: 5
  },
  personName: {
    type: 'text',
    placeholder: 'Прізвище та ініціали того хто добавив запис, наприклад Петров П.П.',
    label: 'Прізвище та ініціали того хто добавив запис, наприклад Петров П.П.',
    fieldName: 'personName',
    required: true
  },
  additionalInformation: {
    type: 'textarea',
    placeholder: 'Будь-яка додаткова інформація',
    label: 'Будь-яка додаткова інформація',
    fieldName: 'additionalInformation',
    required: false
  }
};

export const editShipInfoFields = {
  date: {
    type: 'datetime-local',
    placeholder: 'Виберіть дату та час',
    label: 'Виберіть дату та час',
    fieldName: 'date'
  },
  peleng: {
    type: 'number',
    placeholder: 'Введіть пеленг від 0 до 360',
    label: 'Пеленг',
    fieldName: 'peleng',
    required: false,
    min: 0,
    max: 360,
    columnWidth: 5
  },
  shipCallsign: {
    type: 'text',
    placeholder: "Позивний під яким виходив на зв'язок",
    label: "Позивний під яким виходив на зв'язок",
    fieldName: 'shipCallsign',
    required: false,
    columnWidth: 5
  },
  companionCallsign: {
    type: 'text',
    placeholder: "Позивний того з ким виходив на зв'язок",
    label: "Позивний того з ким виходив на зв'язок",
    fieldName: 'companionCallsign',
    required: false,
    columnWidth: 5
  },
  frequency: {
    type: 'text',
    placeholder: 'Частота на якій спостерігалось, наприклад 0000 або 123.456',
    label: 'Частота на якій спостерігалось, наприклад 0000 або 123.456',
    fieldName: 'frequency',
    required: false,
    columnWidth: 5
  },
  personName: {
    type: 'text',
    placeholder: 'Прізвище та ініціали того хто добавив запис, наприклад Петров П.П.',
    label: 'Прізвище та ініціали того хто добавив запис, наприклад Петров П.П.',
    fieldName: 'personName',
    required: true,
    disabled: true
  },
  personEditName: {
    type: 'text',
    placeholder: 'Прізвище та ініціали того хто редагує запис, наприклад Петров П.П.',
    label: 'Прізвище та ініціали того хто редагує запис, наприклад Петров П.П.',
    fieldName: 'personEditName',
    required: true
  },
  additionalInformation: {
    type: 'textarea',
    placeholder: 'Будь-яка додаткова інформація',
    label: 'Будь-яка додаткова інформація',
    fieldName: 'additionalInformation',
    required: false
  }
};
