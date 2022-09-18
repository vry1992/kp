export const pelengFormConfig = {
  startPelengPoint: {
    type: 'text',
    placeholder: 'Виберіть на карті точку відліку',
    label: 'Виберіть на карті точку відліку',
    fieldName: 'startPelengPoint',
    required: true,
    disabled: true
  },
  peleng: {
    type: 'number',
    placeholder: 'Введіть пеленг від 0 до 360',
    label: 'Пеленг',
    fieldName: 'peleng',
    required: true,
    min: 0,
    max: 360
  },
  color: {
    type: 'color',
    placeholder: 'Оберіть колір лінії',
    label: 'Оберіть колір лінії',
    fieldName: 'color'
  }
};
