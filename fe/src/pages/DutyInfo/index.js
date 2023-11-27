import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { Headline } from '../../components/Headline';
import { dutyInfoFormConfig } from '../../constants/dutyInfoForm';
import { useForm } from '../../hooks/useForm';
import { useValidation } from '../../hooks/useValidation';
import { FormField } from '../../components/FormField';
import { CustomButton } from '../../components/CustomButton';
import { useNavigate } from 'react-router-dom';

const initialValues = Object.fromEntries(Object.keys(dutyInfoFormConfig).map((item) => [item, '']));

export const DUTY_INFO_STORAGE_KEY = 'DUTY_INFO';

export function DutyInfo() {
  const navigate = useNavigate();
  const { checkIsFormValid, isFormValid } = useForm(dutyInfoFormConfig);
  const { validationSchema } = useValidation(dutyInfoFormConfig);
  const { values, handleChange, handleSubmit, errors, touched, handleBlur, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: (data) => {
        localStorage.setItem(DUTY_INFO_STORAGE_KEY, JSON.stringify(data));
        navigate('/map');
      }
    });

  useEffect(() => {
    checkIsFormValid(errors, values);
  }, [values, errors]);

  function onChangeDate({ target: { name, value } }) {
    setFieldValue(name, value);
  }

  const renderForm = () => {
    return Object.entries(dutyInfoFormConfig).map(([name, fieldProps]) => (
      <FormField
        key={name}
        onChange={fieldProps.type === 'date' ? onChangeDate : handleChange}
        onBlur={handleBlur}
        value={values[name]}
        error={errors[name]}
        touched={touched[name]}
        {...fieldProps}
      />
    ));
  };

  return (
    <div>
      <Headline text={'Введіть інформацію про чергового'} />
      <form onSubmit={handleSubmit}>
        {renderForm()}
        <CustomButton text={'Зберегти'} type="submit" disabled={!isFormValid} />
      </form>
    </div>
  );
}
