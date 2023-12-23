export const aircraftInfoFields = {
  flyAmount: {
    type: 'number',
    placeholder: 'Кількість літаковильотів',
    label: 'Кількість літаковильотів',
    fieldName: 'flyAmount',
    required: true,
    min: 1
  },
  date: {
    type: 'datetime-local',
    placeholder: 'Виберіть дату та час',
    label: 'Виберіть дату та час',
    fieldName: 'date',
    required: true
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
  callsign: {
    type: 'text',
    placeholder: 'Позивний або бортовий номер',
    label: 'Позивний або бортовий номер',
    fieldName: 'callsign',
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

export const editAircraftInfoFields = {
  flyAmount: {
    type: 'number',
    placeholder: 'Кількість літаковильотів',
    label: 'Кількість літаковильотів',
    fieldName: 'flyAmount',
    required: true,
    min: 1
  },
  date: {
    type: 'datetime-local',
    placeholder: 'Виберіть дату та час',
    label: 'Виберіть дату та час',
    fieldName: 'date',
    required: true,
    disabled: true
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
  callsign: {
    type: 'text',
    placeholder: 'Позивний або бортовий номер',
    label: 'Позивний або бортовий номер',
    fieldName: 'callsign',
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

export const aircraftTypeMap = {
  a50: 'ДРЛВ і У А-50',
  su: 'Су',
  mig: 'МіГ',
  tu: 'Ту',
  il: 'Іл',
  an: 'Ан',
  be: 'БЕ',
  ka: 'Ка',
  mi: 'Мі'
};

export const aircrafts = {
  a50: {
    a50: {
      label: 'А-50',
      value: 'a50'
    }
  },
  su: {
    su27: {
      label: 'Су-27',
      value: 'su27'
    },
    su24: {
      label: 'Су-24',
      value: 'su24'
    },
    su24m: {
      label: 'Су-24М',
      value: 'su24m'
    },
    su24mr: {
      label: 'Су-24МР',
      value: 'su24mr'
    },
    su30: {
      label: 'Су-30',
      value: 'su30'
    },
    su34: {
      label: 'Су-34',
      value: 'su34'
    },
    su35: {
      label: 'Су-35',
      value: 'su35'
    },
    su57: {
      label: 'Су-57',
      value: 'su57'
    }
  },
  mig: {
    mig29: {
      label: 'Миг-29',
      value: 'mig29'
    },
    mig31: {
      label: 'Миг-31',
      value: 'mig31'
    },
    mig25: {
      label: 'Миг-25',
      value: 'mig25'
    }
  },
  tu: {
    tu95: {
      label: 'Ту-95',
      value: 'tu95'
    },
    tu160: {
      label: 'Ту-160',
      value: 'tu160'
    },
    tu22m: {
      label: 'Ту-22М',
      value: 'tu22m'
    }
  },
  il: {
    il76: {
      label: 'Ил-76',
      value: 'il76'
    },
    il78: {
      label: 'Ил-78',
      value: 'il78'
    },
    il22: {
      label: 'Ил-22',
      value: 'il22'
    },
    il38: {
      label: 'Ил-38',
      value: 'il38'
    }
  },
  an: {
    an12: {
      label: 'Ан-12',
      value: 'an12'
    },
    an124: {
      label: 'Ан-124',
      value: 'an124'
    },
    an140: {
      label: 'Ан-140',
      value: 'an140'
    }
  },
  be: {
    be12: {
      label: 'Бе-12',
      value: 'be12'
    }
  },
  ka: {
    ka52: {
      label: 'Ка-52',
      value: 'ka52'
    },
    ka31r: {
      label: 'Ка-31Р',
      value: 'ka31r'
    },
    ka27: {
      label: 'Ка-27',
      value: 'ka27'
    }
  },
  mi: {
    mi8: {
      label: 'Ми-8',
      value: 'mi8'
    },
    mi24: {
      label: 'Ми-24',
      value: 'mi24'
    },
    mi35: {
      label: 'Ми-35',
      value: 'mi35'
    },
    mi28: {
      label: 'Ми-28',
      value: 'mi28'
    },
    ka52: {
      label: 'Ka-52',
      value: 'ka52'
    }
  }
};
