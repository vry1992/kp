import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Row, Col } from 'react-bootstrap';
import { newShipFormConfig } from '../../constants/newShipForm';
import { FormField } from '../FormField';
import { CustomButton } from '../CustomButton';
import { useValidation } from '../../hooks/useValidation';
import { useForm } from '../../hooks/useForm';
import { MandatoryFieldsNotification } from '../MandatoryFieldsNotification';
import { getUnitNames } from '../../selectors';
import { postShip } from '../../actions/ships';
import { Modal } from '../Modal';
import { Paragraph } from '../Paragraph';
import { routesConfig } from '../../routing';

const initialValues = Object.fromEntries(Object.keys(newShipFormConfig).map((item) => [item, '']));

export function NewShipForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const unitNames = useSelector(getUnitNames);
  const { validationSchema } = useValidation(newShipFormConfig);
  const { checkIsFormValid, isFormValid } = useForm(newShipFormConfig);
  const [errorModal, setErrorModal] = useState({ open: false, message: '' });

  const { values, handleChange, handleSubmit, errors, touched, handleBlur, resetForm } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onSubmit
  });

  const onSuccess = () => {
    navigate(routesConfig.successAddedShip.path, { state: values });
  };

  const onError = (message) => {
    setErrorModal({ open: true, message });
  };

  function onSubmit() {
    dispatch(postShip(values, onSuccess, onError));
  }

  function getOptions(name, props) {
    if (name === newShipFormConfig.shipUnit.fieldName) {
      return unitNames.map(({ unitId, unitName }) => ({ key: unitId, label: unitName }));
    } else if (name === newShipFormConfig.shipType.fieldName) {
      return props.options;
    }
  }

  useEffect(() => {
    checkIsFormValid(errors, values);
  }, [values, errors]);

  const renderForm = () => {
    return Object.entries(newShipFormConfig).map(([name, props]) => {
      return (
        <FormField
          {...props}
          key={name}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values[name]}
          error={errors[name]}
          touched={touched[name]}
          options={getOptions(name, props)}
        />
      );
    });
  };

  const onAnotherShipClick = () => {
    setErrorModal({ open: false, message: '' });
    resetForm(initialValues);
  };

  const toShipInfoPage = () => {
    navigate(routesConfig.shipInfo.path);
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <p>???????????????? ?????????????????? ??????????????????????:</p>
          <ol>
            <li>
              ???????????????????? ??????????????:
              <ul>
                <li>197 ?????????????? ?????????????????? ????????????????</li>
              </ul>
            </li>
            <li>
              ???? ?????????????????? ????????????????:
              <ul>
                <li>197-?? ?????????????? ?????????????????? ????????????????</li>
                <li>197-?? ?????????????? ?????????????????? ????????????????</li>
                <li>197-?? ??????</li>
              </ul>
            </li>
          </ol>
          <Row className="justify-content-md-center">
            <Col xs={6}>{renderForm()}</Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col xs={6}>
              <MandatoryFieldsNotification />
              <CustomButton text="????????????????" type="submit" disabled={!isFormValid} />
            </Col>
          </Row>
        </form>
      </div>
      <Modal show={errorModal.open} isError={true}>
        <Paragraph text={errorModal.message} />
        <CustomButton onClick={onAnotherShipClick} text="???????????? ?????????? ????????????????" />
        <CustomButton
          onClick={toShipInfoPage}
          text={`???????????? ???????????????????? ?????? ?????????????????? ${values[newShipFormConfig.shipName.fieldName]}`}
        />
      </Modal>
    </>
  );
}
