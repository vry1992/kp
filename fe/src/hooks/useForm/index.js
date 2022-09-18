import { useState } from 'react';

export function useForm(requiredFields) {
  const [isFormValid, setIsFormValid] = useState(false);

  const checkIsFormValid = (errors, values) => {
    const isError = !!Object.values(errors).filter(Boolean).length;
    const areRequiredFieldsFilled = !Object.entries(requiredFields)
      .map(([fieldName, { required }]) => {
        return required && !values[fieldName] ? fieldName : false;
      })
      .filter(Boolean).length;
    setIsFormValid(!isError && areRequiredFieldsFilled);
  };

  return {
    isFormValid,
    checkIsFormValid
  };
}
