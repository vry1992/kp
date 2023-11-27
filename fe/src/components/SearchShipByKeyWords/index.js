import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Row, Col } from 'react-bootstrap';
import { newShipFormConfig } from '../../constants/newShipForm';
import { FormField } from '../FormField';
import { useValidation } from '../../hooks/useValidation';
import { useForm } from '../../hooks/useForm';
import { getUnitNames } from '../../selectors';
import { searchShipFormConfig, shipInfoFields } from '../../constants/shipInfo';
import { postSearchShipKeyWord, postShipData } from '../../actions/ships';
import { errorSearchShip } from '../../constants/validation';
import { coordinatesConverter } from '../../helpers';
import { CustomButton } from '../CustomButton';
import './index.scss';
import { DUTY_INFO_STORAGE_KEY } from '../../pages/DutyInfo';

const storageData = localStorage.getItem(DUTY_INFO_STORAGE_KEY);
const dutyData = storageData ? JSON.parse(storageData) : null;

export function SearchShipByKeyWords({ selectedShipData, resetShipList }) {
  const dispatch = useDispatch();
  const unitNames = useSelector(getUnitNames);
  const { validationSchema } = useValidation({ ...searchShipFormConfig, ...shipInfoFields });
  const { checkIsFormValid, isFormValid } = useForm({ ...searchShipFormConfig, ...shipInfoFields });

  const initialValues = {
    ...Object.fromEntries(
      Object.keys({ ...searchShipFormConfig, ...shipInfoFields }).map((item) => {
        const value = selectedShipData?.[item] || '';
        if (item === 'date') {
          return [item, new Date().setHours(0, 0, 0, 0)];
        }
        return [item, value];
      })
    ),
    personName: dutyData?.dutyManFullName || '',
    peleng: '',
    date: new Date()
  };

  const {
    values,
    setFieldTouched,
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    touched,
    setFieldError,
    setFieldValue,
    resetForm,
    setValues
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onSubmit
  });

  function onSuccessSubmit() {
    setValues(initialValues);
    resetForm();
    resetShipList();
  }

  function onFailSubmit() {
    setValues(initialValues);
    resetForm();
    resetShipList();
  }

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
      shipCallsign
    } = values;
    const dataToSubmit = {
      shipId: selectedShipData.shipId,
      discoverTimestamp: new Date(date).getTime(),
      personName,
      frequency,
      ...(latitudeDegs &&
        latitudeMinutes && { latitude: coordinatesConverter(latitudeDegs, latitudeMinutes) }),
      ...(longitudeDegs &&
        longitudeMinutes && { longitude: coordinatesConverter(longitudeDegs, longitudeMinutes) }),
      ...(peleng && { peleng }),
      ...(additionalInformation && { additionalInformation }),
      ...(shipCallsign && { shipCallsign }),
      ...(companionCallsign && { companionCallsign })
    };
    dispatch(
      postShipData({
        data: dataToSubmit,
        onSuccess: onSuccessSubmit,
        onError: onFailSubmit
      })
    );
  }

  function onSubmitSearch(payload) {
    dispatch(postSearchShipKeyWord(payload));
  }

  function onFailSearch() {
    setFieldError('search', errorSearchShip);
  }

  function onChange(event) {
    handleChange(event);
    const {
      target: { value, name }
    } = event;
    if (name === 'search') {
      setFieldTouched('search', true);
    }
    if (!selectedShipData && value.length && value.length % 3 === 0) {
      onSubmitSearch({ data: { search: value }, onError: onFailSearch });
    }
  }

  function onChangeDate({ target: { value, name } }) {
    setFieldValue(name, value);
  }

  function editButtonClickHandler() {
    resetShipList();
    setFieldValue('search', '');
  }

  useEffect(() => {
    checkIsFormValid(errors, values);
  }, [values, errors]);

  useEffect(() => {
    selectedShipData && setFieldValue('search', selectedShipData.shipName);
  }, [selectedShipData]);

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

  const renderSearchShipForm = () => {
    return Object.entries(searchShipFormConfig).map(([name, { options, ...restProps }]) => {
      const opts = name === newShipFormConfig.shipUnit.fieldName ? unitNames : options;
      return renderField({
        name,
        options: opts,
        disabled: !!selectedShipData,
        onChange,
        ...restProps
      });
    });
  };

  const renderShipInfoForm = () => {
    return Object.entries(shipInfoFields).map(([name, { options, ...restProps }]) => {
      const opts = name === newShipFormConfig.shipUnit.fieldName ? unitNames : options;
      return renderField({
        name,
        options: opts,
        onChange,
        onBlur: handleBlur,
        ...(name === 'date' && { onChange: onChangeDate }),
        ...restProps
      });
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Row className="justify-content-md-center">
          {renderSearchShipForm()}
          {selectedShipData && (
            <Col xs="10">
              <div className="edit-button">
                <CustomButton
                  text="Змінити"
                  iconPath={`${process.env.PUBLIC_URL}/images/icons/pencil.png`}
                  onClick={editButtonClickHandler}
                />
              </div>
            </Col>
          )}
        </Row>
        {selectedShipData && (
          <Row className="justify-content-md-center">
            {renderShipInfoForm()}
            <Col xs={10}>
              <CustomButton text="Зберегти" type="submit" disabled={!isFormValid} />
            </Col>
          </Row>
        )}
      </form>
    </div>
  );
}