export const searchShipFormConfig = {
  search: {
    type: 'text',
    placeholder: 'Введіть назву корабля',
    label: 'Введіть назву корабля',
    fieldName: 'search',
    autoComplete: 'off'
  }
};

export const shipInfoFields = {
  date: {
    type: 'datetime-local',
    placeholder: 'Виберіть дату та час',
    label: 'Виберіть дату та час',
    fieldName: 'date',
    required: true
  },
  latitudeDegs: {
    type: 'number',
    placeholder: 'Введіть градуси північної широти',
    label: 'Градуси північної широти',
    fieldName: 'latitudeDegs',
    required: false,
    min: -90,
    max: 90,
    columnWidth: 5
  },
  latitudeMinutes: {
    type: 'number',
    placeholder: 'Введіть мінути північної широти',
    label: 'Мінути північної широти',
    fieldName: 'latitudeMinutes',
    required: false,
    min: 0,
    max: 60,
    columnWidth: 5
  },
  longitudeDegs: {
    type: 'number',
    placeholder: 'Введіть градуси східної довготи',
    label: 'Градуси східної довготи',
    fieldName: 'longitudeDegs',
    required: false,
    min: 0,
    max: 180,
    columnWidth: 5
  },
  longitudeMinutes: {
    type: 'number',
    placeholder: 'Введіть мінути східної довготи',
    label: 'Мінути східної довготи',
    fieldName: 'longitudeMinutes',
    required: false,
    min: 0,
    max: 60,
    columnWidth: 5
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
  latitudeDegs: {
    type: 'number',
    placeholder: 'Введіть градуси північної широти',
    label: 'Градуси північної широти',
    fieldName: 'latitudeDegs',
    required: false,
    min: -90,
    max: 90,
    columnWidth: 5
  },
  latitudeMinutes: {
    type: 'number',
    placeholder: 'Введіть мінути північної широти',
    label: 'Мінути північної широти',
    fieldName: 'latitudeMinutes',
    required: false,
    min: 0,
    max: 60,
    columnWidth: 5
  },
  longitudeDegs: {
    type: 'number',
    placeholder: 'Введіть градуси східної довготи',
    label: 'Градуси східної довготи',
    fieldName: 'longitudeDegs',
    required: false,
    min: 0,
    max: 180,
    columnWidth: 5
  },
  longitudeMinutes: {
    type: 'number',
    placeholder: 'Введіть мінути східної довготи',
    label: 'Мінути східної довготи',
    fieldName: 'longitudeMinutes',
    required: false,
    min: 0,
    max: 60,
    columnWidth: 5
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
