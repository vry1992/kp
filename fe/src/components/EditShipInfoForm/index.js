import React, { useEffect, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { useValidation } from '../../hooks/useValidation';
import { useFormik } from 'formik';
import { FormField } from '../FormField';
import { Accordion, Col, Form, Row } from 'react-bootstrap';
import { editShipInfoFields } from '../../constants/shipInfo';
import './index.scss';
import { DUTY_INFO_STORAGE_KEY } from '../../pages/DutyInfo';
import { v4 as uuidv4 } from 'uuid';
import { shipTypeMap } from '../../constants';

const initialValues = Object.fromEntries(Object.keys(editShipInfoFields).map((item) => [item, '']));

export const EditShipInfoForm = ({ onFormChange, shipsListData, initData }) => {
  const { checkIsFormValid, isFormValid } = useForm(editShipInfoFields);
  const { validationSchema } = useValidation(editShipInfoFields);
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
        shipCallsign: initData.ship_callsign || '',
        companionCallsign: initData.companion_callsign || '',
        frequency: initData.frequency || '',
        additionalInformation: initData.additional_information || '',
        personName: initData.person_who_added || '',
        personEditName: personName
      });
    }
  }, [initData]);

  useEffect(() => {
    if (!Object.keys(initData).length) return;
    const { unknownData } = initData;
    if (unknownData && JSON.parse(unknownData)?.length) {
      const grouped = JSON.parse(unknownData).reduce((acc, curr) => {
        const existed = acc[curr.type] || [];
        return {
          ...acc,
          [curr.type]: [
            ...existed,
            { label: curr.shipName, value: curr.shipId || uuidv4(), type: curr.type }
          ]
        };
      }, {});
      setTypes(grouped);
    } else {
      const neededShip = Object.values(shipsListData)
        .flat()
        .find(({ ship_id }) => ship_id === initData.ship.ship_id);
      if (neededShip) {
        setTypes({
          [neededShip.ship_type]: [
            { label: neededShip.ship_name, type: neededShip.ship_type, value: neededShip.ship_id }
          ]
        });
      }
    }
  }, [initData]);

  function onChangeDate({ target: { name, value } }) {
    setFieldValue(name, value);
  }

  const renderForm = () => {
    return Object.entries(editShipInfoFields).map(([name, fieldProps]) => (
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
                            checked={
                              !!types[ship_type]?.find(
                                (item) => item.label === ship_name || item.value === ship_id
                              )
                            }
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
