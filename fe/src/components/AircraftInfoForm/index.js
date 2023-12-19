import React, { useEffect, useState } from 'react';
import { aircraftInfoFields, aircraftTypeMap, aircrafts } from '../../constants/AircraftInfo';
import { useForm } from '../../hooks/useForm';
import { useValidation } from '../../hooks/useValidation';
import { useFormik } from 'formik';
import { FormField } from '../FormField';
import { Accordion, Form } from 'react-bootstrap';

const initialValues = Object.fromEntries(Object.keys(aircraftInfoFields).map((item) => [item, '']));

export const AircraftInfoForm = ({ onFormChange }) => {
  const { checkIsFormValid, isFormValid } = useForm(aircraftInfoFields);
  const { validationSchema } = useValidation(aircraftInfoFields);
  const [types, setTypes] = useState({});
  const { values, handleChange, handleSubmit, errors, touched, handleBlur, setFieldValue } =
    useFormik({
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

  const renderForm = () => {
    return Object.entries(aircraftInfoFields).map(([name, fieldProps]) => (
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

  const onTypeSelect = (key, value, label) => {
    setTypes((prev) => {
      const prevWithKey = prev[key] || [];
      return {
        ...prev,
        [key]: [...prevWithKey, { label, value }]
      };
    });
  };

  useEffect(() => {
    const isReady = isFormValid && !!Object.keys(types);
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
        <Accordion>
          {Object.entries(aircrafts).map(([key, planes]) => {
            return (
              <Accordion.Item eventKey={key} key={key}>
                <Accordion.Header>
                  {aircraftTypeMap[key]} <pre>{'     '}</pre>
                  <i>{types[key] ? `(${types[key]?.map(({ label }) => label).join(', ')})` : ''}</i>
                </Accordion.Header>
                <Accordion.Body>
                  {Object.values(planes).map(({ label, value }) => {
                    return (
                      <Form.Check // prettier-ignore
                        key={value}
                        type={'checkbox'}
                        id={value}
                        label={label}
                        onChange={(event) => {
                          onTypeSelect(key, event.target.id, event.target.labels[0].innerText);
                        }}
                      />
                    );
                  })}
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
        <br />
        {renderForm()}
      </form>
    </div>
  );
};
