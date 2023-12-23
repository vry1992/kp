import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Row, Col } from 'react-bootstrap';
import { newUnitFormConfig } from '../../constants/newUnitForm';
import { FormField } from '../FormField';
import { CustomButton } from '../CustomButton';
import { useValidation } from '../../hooks/useValidation';
import { useForm } from '../../hooks/useForm';
import { MandatoryFieldsNotification } from '../MandatoryFieldsNotification';
import { Modal } from '../Modal';
import { Paragraph } from '../Paragraph';
import { useNavigate } from 'react-router-dom';
import { routesConfig } from '../../routing';
import { UnitServices } from '../../features/units/services/UnitServices';

const initialValues = Object.fromEntries(Object.keys(newUnitFormConfig).map((item) => [item, '']));

export function NewUnitForm() {
  const navigate = useNavigate();
  const { validationSchema } = useValidation(newUnitFormConfig);
  const { checkIsFormValid, isFormValid } = useForm(newUnitFormConfig);
  const [errorModal, setErrorModal] = useState({ open: false, message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const { values, handleChange, handleSubmit, errors, touched, handleBlur, resetForm } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onSubmit
  });

  const onSuccess = () => {
    navigate(routesConfig.successAddedunit.path, { state: values });
    setIsLoading(false);
  };

  const onError = (message) => {
    setErrorModal({ open: true, message });
    setIsLoading(false);
  };

  async function onSubmit() {
    setIsLoading(true);
    try {
      await UnitServices.createNewUnit(values);
      onSuccess();
    } catch (error) {
      onError();
    }
  }

  useEffect(() => {
    checkIsFormValid(errors, values);
  }, [values, errors]);

  const renderForm = () => {
    return Object.entries(newUnitFormConfig).map(([name, fieldProps]) => (
      <FormField
        key={name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values[name]}
        error={errors[name]}
        touched={touched[name]}
        {...fieldProps}
      />
    ));
  };

  const onAnotherUnitClick = () => {
    setErrorModal({ open: false, message: '' });
    resetForm(initialValues);
  };

  const confirmSave = async () => {
    try {
      await UnitServices.createNewUnit({ ...values, conflictConfirmed: true });
      onSuccess();
    } catch (error) {
      onError();
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <p>Приклади додавання підрозділів:</p>
          <ol>
            <li>
              Правильний варіант:
              <ul>
                <li>197 Бригада десантних кораблів</li>
              </ul>
            </li>
            <li>
              Не правильні варіанти:
              <ul>
                <li>197-а Бригада десантних кораблів</li>
                <li>197-я Бригада десантных кораблей</li>
                <li>197-я БДК</li>
              </ul>
            </li>
          </ol>
          <Row className="justify-content-md-center">
            <Col xs={6}>{renderForm()}</Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col xs={6}>
              <MandatoryFieldsNotification />
              <CustomButton text="Зберегти" type="submit" disabled={!isFormValid || isLoading} />
            </Col>
          </Row>
        </form>
      </div>
      <Modal show={errorModal.open} isError={true}>
        <Paragraph text={errorModal.message} />
        <CustomButton onClick={onAnotherUnitClick} text="Ввести інший підрозділ" />
        <CustomButton onClick={confirmSave} text="Всеодно зберегти" />
      </Modal>
    </>
  );
}
