import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { Headline } from '../../components/Headline';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getShipEditData } from '../../selectors';
import { editShipInfoFields } from '../../constants/shipInfo';
import { FormField } from '../../components/FormField';
import { CustomButton } from '../../components/CustomButton';
import { useValidation } from '../../hooks/useValidation';
import { editShipData, getShipInfoByIdAction } from '../../actions/ships';
import { useFormik } from 'formik';
import { coordinatesConverter, coordinatesConverterBack } from '../../helpers';
import './index.scss';
import { useForm } from '../../hooks/useForm';
import { routesConfig } from '../../routing';

export function EditShipInfo() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector(getShipEditData);
  const { checkIsFormValid, isFormValid } = useForm(editShipInfoFields);
  const { validationSchema } = useValidation({ ...editShipInfoFields });

  const {
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    touched,
    setFieldValue,
    setValues,
    resetForm
  } = useFormik({
    initialValues: {
      date: new Date(data.discover_timestamp),
      latitudeDegs: coordinatesConverterBack(data.latitude).deg,
      latitudeMinutes: coordinatesConverterBack(data.latitude).min,
      longitudeDegs: coordinatesConverterBack(data.longitude).deg,
      longitudeMinutes: coordinatesConverterBack(data.longitude).min,
      peleng: data.peleng,
      personName: data.person_who_added,
      personEditName: '',
      additionalInformation: data.additional_information,
      shipCallsign: data.ship_callsign,
      companionCallsign: data.companion_callsign,
      frequency: data.frequency
    },
    validationSchema,
    onSubmit: onSubmit
  });

  function onSubmit() {
    const {
      date,
      peleng,
      additionalInformation,
      personName,
      latitudeDegs,
      latitudeMinutes,
      longitudeDegs,
      longitudeMinutes,
      frequency,
      companionCallsign,
      shipCallsign,
      personEditName
    } = values;
    const dataToSubmit = {
      date,
      peleng,
      additionalInformation,
      personName,
      latitudeDegs,
      latitudeMinutes,
      longitudeDegs,
      longitudeMinutes,
      frequency,
      companionCallsign,
      shipCallsign,
      personEditName
    };
    dispatch(
      editShipData({
        data: {
          ...dataToSubmit,
          ...(latitudeDegs &&
            latitudeMinutes && { latitude: coordinatesConverter(latitudeDegs, latitudeMinutes) }),
          ...(longitudeDegs &&
            longitudeMinutes && {
              longitude: coordinatesConverter(longitudeDegs, longitudeMinutes)
            }),
          id: params.id
        },
        onSuccess: onSuccessSubmit
      })
    );
  }

  function onSuccessSubmit() {
    navigate(routesConfig.search.path);
    resetForm();
  }

  useEffect(() => {
    checkIsFormValid(errors, values);
  }, [values, errors]);

  const renderField = ({ name, options, date, time, onChange, columnWidth = 10, ...restProps }) => {
    return (
      <Col xs={columnWidth} key={name}>
        <FormField
          onChange={onChange}
          value={values[name]}
          error={errors[name]}
          touched={touched[name]}
          options={options}
          date={date}
          time={time}
          name={name}
          {...restProps}
        />
      </Col>
    );
  };

  function onChange(event) {
    handleChange(event);
  }

  function onChangeDate({ target: { value, name } }) {
    setFieldValue(name, value);
  }

  const renderShipInfoForm = () => {
    return Object.entries(editShipInfoFields).map(([name, { ...restProps }]) => {
      return renderField({
        name,
        onChange,
        onBlur: handleBlur,
        ...(name === 'date' && { onChange: onChangeDate }),
        ...restProps
      });
    });
  };

  useEffect(() => {
    dispatch(getShipInfoByIdAction(params));
  }, [params]);

  useEffect(() => {
    setValues({
      date: new Date(data.discover_timestamp),
      latitudeDegs: coordinatesConverterBack(data.latitude).deg,
      latitudeMinutes: coordinatesConverterBack(data.latitude).min,
      longitudeDegs: coordinatesConverterBack(data.longitude).deg,
      longitudeMinutes: coordinatesConverterBack(data.longitude).min,
      peleng: data.peleng || '',
      personName: data.person_who_added,
      personEditName: '',
      additionalInformation: data.additional_information || '',
      shipCallsign: data.ship_callsign || '',
      companionCallsign: data.companion_callsign || '',
      frequency: data.frequency || ''
    });
  }, [data]);

  return (
    <div className="ship-info">
      <form onSubmit={handleSubmit}>
        <Row className="justify-content-md-center">
          {renderShipInfoForm()}
          <Col xs={10}>
            <CustomButton text="Зберегти" type="submit" disabled={!isFormValid} />
          </Col>
        </Row>
      </form>
    </div>
  );
}
