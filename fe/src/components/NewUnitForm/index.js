import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { newUnitFormConfig } from '../../constants/newUnitForm';
import { FormField } from '../FormField';
import { CustomButton } from '../CustomButton';
import { useValidation } from '../../hooks/useValidation';
import { useForm } from '../../hooks/useForm';
import { MandatoryFieldsNotification } from '../MandatoryFieldsNotification';
import { postUnit } from '../../actions/newUnit';
import { Modal } from '../Modal';
import { Paragraph } from '../Paragraph';
import { useNavigate } from 'react-router-dom';
import { routesConfig } from '../../routing';

const initialValues = Object.fromEntries(Object.keys(newUnitFormConfig).map((item) => [item, '']));

export function NewUnitForm() {
  const navigate = useNavigate();
  const { validationSchema } = useValidation(newUnitFormConfig);
  const { checkIsFormValid, isFormValid } = useForm(newUnitFormConfig);
  const [errorModal, setErrorModal] = useState({ open: false, message: '' });
  const dispatch = useDispatch();

  const { values, handleChange, handleSubmit, errors, touched, handleBlur, resetForm } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onSubmit
  });

  const onSuccess = () => {
    navigate(routesConfig.successAddedunit.path, { state: values });
  };

  const onError = (message) => {
    setErrorModal({ open: true, message });
  };

  function onSubmit() {
    dispatch(postUnit(values, onSuccess, onError));
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

  const confirmSave = () => {
    dispatch(postUnit({ ...values, conflictConfirmed: true }, onSuccess, onError));
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <p>Приклади додавання кораблів:</p>
          <ol>
            <li>
              Правильний варіант (мовою свинособак):
              <ul>
                <li>Вице-Адмирал Захарьин</li>
                <li>Цезарь Кунников</li>
              </ul>
            </li>
            <li>
              Не правильні варіанти:
              <ul>
                <li>ВА Захарьин</li>
                <li>В. Захарьин</li>
                <li>Захарьин</li>
                <li>Ц. Кунников</li>
                <li>Кунников</li>
              </ul>
            </li>
          </ol>
          <Row className="justify-content-md-center">
            <Col xs={6}>{renderForm()}</Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col xs={6}>
              <MandatoryFieldsNotification />
              <CustomButton text="Зберегти" type="submit" disabled={!isFormValid} />
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
