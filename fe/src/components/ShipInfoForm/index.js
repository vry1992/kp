import React, { useEffect, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { useValidation } from '../../hooks/useValidation';
import { useFormik } from 'formik';
import { FormField } from '../FormField';
import { Accordion, Col, Form, Row } from 'react-bootstrap';
import { shipInfoFields } from '../../constants/shipInfo';
import './index.scss';
import { DUTY_INFO_STORAGE_KEY } from '../../pages/DutyInfo';
import { shipTypeMap } from '../../constants';

const initialValues = Object.fromEntries(Object.keys(shipInfoFields).map((item) => [item, '']));

export const ShipInfoForm = ({ onFormChange, shipsListData }) => {
  const { checkIsFormValid, isFormValid } = useForm(shipInfoFields);
  const { validationSchema } = useValidation(shipInfoFields);
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
    validationSchema,
    onSubmit: (data) => {
      console.log(data);
    }
  });

  useEffect(() => {
    checkIsFormValid(errors, values);
  }, [values, errors]);

  function onChangeDate({ target: { name, value } }) {
    setFieldValue(name, value);
  }

  useEffect(() => {
    const dutyInfo = JSON.parse(localStorage.getItem(DUTY_INFO_STORAGE_KEY) || JSON.stringify({}));
    const personName = dutyInfo.dutyManFullName || '';
    setValues({
      personName,
      date: new Date().toISOString()
    });
  }, []);

  const renderForm = () => {
    return Object.entries(shipInfoFields).map(([name, fieldProps]) => (
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
      setTypes({
        ...types,
        [key]: newTypesByKey
      });
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
  }, [types, values, isFormValid]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>Оберіть тип:</p>
        <Row>
          <Col xs={6}>
            <Accordion className="ships-types">
              {Object.entries(shipsListData).map(([key, ships]) => {
                return (
                  <Accordion.Item eventKey={key} key={key}>
                    <Accordion.Header>
                      {shipTypeMap[key] || key} <pre>{'     '}</pre>
                      <i>
                        {types[key]?.length
                          ? `(${types[key]?.map(({ label }) => label).join(', ')})`
                          : ''}
                      </i>
                    </Accordion.Header>
                    <Accordion.Body>
                      {Object.values(ships).map(({ ship_name, ship_id, ship_type }) => {
                        return (
                          <Form.Check
                            key={ship_id}
                            type={'checkbox'}
                            id={ship_id}
                            label={ship_name}
                            onChange={(event) => {
                              const { id, labels, checked } = event.target;
                              onTypeSelect(ship_type, id, labels[0].innerText, checked);
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
