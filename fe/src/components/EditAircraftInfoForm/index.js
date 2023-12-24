import React, { useEffect, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { useValidation } from '../../hooks/useValidation';
import { useFormik } from 'formik';
import { FormField } from '../FormField';
import { Accordion, Col, Form, Row } from 'react-bootstrap';
import './index.scss';
import { DUTY_INFO_STORAGE_KEY } from '../../pages/DutyInfo';
import { aircraftTypeMap, aircrafts, editAircraftInfoFields } from '../../constants/AircraftInfo';

const initialValues = Object.fromEntries(
  Object.keys(editAircraftInfoFields).map((item) => [item, ''])
);

export const EditAircraftInfoForm = ({ onFormChange, initData }) => {
  const { checkIsFormValid, isFormValid } = useForm(editAircraftInfoFields);
  const { validationSchema } = useValidation(editAircraftInfoFields);
  const [types, setTypes] = useState({});
  const {
    values,
    setValues,
    handleChange,
    handleSubmit,
    errors,
    touched,
    handleBlur,
    setFieldValue
  } = useFormik({
    initialValues,
    validationSchema
  });

  useEffect(() => {
    checkIsFormValid(errors, values);
  }, [values, errors]);

  useEffect(() => {
    if (Object.keys(initData).length) {
      const dutyInfo = JSON.parse(
        localStorage.getItem(DUTY_INFO_STORAGE_KEY) || JSON.stringify({})
      );
      const personName = dutyInfo.dutyManFullName || '';
      setValues({
        date: initData.discover_timestamp_utc,
        peleng: initData.peleng || '',
        callsign: initData.callsign || '',
        companionCallsign: initData.companion_callsign || '',
        frequency: initData.frequency || '',
        additionalInformation: initData.additional_information || '',
        personName: initData.person_who_added || '',
        personEditName: personName,
        flyAmount: initData.flyAmount
      });
    }
  }, [initData]);

  useEffect(() => {
    if (!Object.keys(initData).length) return;
    if (!initData?.data) return;
    const { data } = initData;
    const grouped = Object.entries(data).reduce((acc, [key, planes]) => {
      const existed = acc[key] || [];
      return {
        ...acc,
        [key]: [...existed, ...planes]
      };
    }, {});
    setTypes(grouped);
  }, [initData]);

  function onChangeDate({ target: { name, value } }) {
    setFieldValue(name, value);
  }

  const renderForm = () => {
    return Object.entries(editAircraftInfoFields).map(([name, fieldProps]) => (
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

  const onTypeSelect = (key, value, label, checked) => {
    if (checked) {
      setTypes((prev) => {
        const prevWithKey = prev[key] || [];
        return {
          ...prev,
          [key]: [...prevWithKey, { label, value }]
        };
      });
    } else {
      const newTypesByKey = types[key].filter((item) => value !== item.value);
      const newTypes = { ...types };
      if (newTypesByKey.length) {
        newTypes[key] = newTypesByKey;
      } else {
        delete newTypes[key];
      }
      setTypes(newTypes);
    }
  };

  useEffect(() => {
    const isReady = isFormValid && !!Object.keys(types).length;
    onFormChange(
      {
        ...values,
        types
      },
      isReady
    );
  }, [types, values, isFormValid, errors]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>Оберіть тип:</p>
        <Row>
          <Col xs={6}>
            <Accordion className="ships-types">
              {Object.entries(aircrafts).map(([key, planes]) => {
                return (
                  <Accordion.Item eventKey={key} key={key}>
                    <Accordion.Header>
                      {aircraftTypeMap[key]} <pre>{'     '}</pre>
                      <i>
                        {types[key] ? `(${types[key]?.map(({ label }) => label).join(', ')})` : ''}
                      </i>
                    </Accordion.Header>
                    <Accordion.Body>
                      {Object.values(planes).map(({ label, value }) => {
                        return (
                          <Form.Check // prettier-ignore
                            key={value}
                            type={'checkbox'}
                            id={value}
                            label={label}
                            checked={!!types[key]?.find((item) => value === item.value)}
                            onChange={(event) => {
                              onTypeSelect(
                                key,
                                event.target.id,
                                event.target.labels[0].innerText,
                                event.target.checked
                              );
                            }}
                          />
                        );
                      })}
                    </Accordion.Body>
                  </Accordion.Item>
                );
              })}
            </Accordion>
          </Col>
          <Col xs={6}>{renderForm()}</Col>
        </Row>
      </form>
      <br />
    </div>
  );
};
