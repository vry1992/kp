import React, { useCallback, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useFormik } from 'formik';
import { useForm } from '../../hooks/useForm';
import { useValidation } from '../../hooks/useValidation';
import { FormField } from '../FormField';
import { MandatoryFieldsNotification } from '../MandatoryFieldsNotification';
import { CustomButton } from '../CustomButton';
import { pelengFormConfig } from '../../constants/pelengForm';
import { getCurrentPeleng } from '../../selectors';
import { addPelengToDraw } from '../../reducers/peleng';

const initialValues = Object.fromEntries(
  Object.entries(pelengFormConfig).map(([key, type]) => [key, type === 'number' ? 0 : ''])
);

export function PelengForm() {
  const { validationSchema } = useValidation(pelengFormConfig);
  const { checkIsFormValid, isFormValid } = useForm(pelengFormConfig);
  const currentPeleng = useSelector(getCurrentPeleng);
  const dispatch = useDispatch();

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
    handleBlur,
    setFieldValue,
    setValues,
    setFieldTouched
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onSubmit
  });

  function onSubmit() {
    const { color, peleng } = values;
    dispatch(
      addPelengToDraw({
        peleng,
        color: color || '#000000'
      })
    );
    setValues(initialValues);
    Object.keys(initialValues).forEach((fieldKey) => setFieldTouched(fieldKey, false));
    checkIsFormValid(errors, values);
  }

  useEffect(() => {
    checkIsFormValid(errors, values);
  }, [values, errors]);

  useEffect(() => {
    if (currentPeleng.lat && currentPeleng.lng) {
      setFieldValue(
        pelengFormConfig.startPelengPoint.fieldName,
        `${currentPeleng.lat}, ${currentPeleng.lng}`
      );
    }
  }, [currentPeleng]);

  const renderForm = useCallback(() => {
    return (
      <>
        {Object.entries(pelengFormConfig).map(([name, fieldProps]) => (
          <FormField
            key={name}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values[name]}
            error={errors[name]}
            touched={touched[name]}
            {...fieldProps}
          />
        ))}
        <CustomButton text="Зберегти" type="submit" disabled={!isFormValid} />
      </>
    );
  }, [handleChange, handleBlur, errors, touched, values, isFormValid]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Row className="justify-content-md-center">
          <Col>{renderForm()}</Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col>
            <MandatoryFieldsNotification />
          </Col>
        </Row>
      </form>
    </div>
  );
}
