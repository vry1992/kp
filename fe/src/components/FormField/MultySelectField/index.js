import React, { useCallback, useEffect, useState } from 'react';
import { FloatingLabel, ListGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { CustomButton } from '../../CustomButton';
import { Modal } from '../../Modal';
import './index.scss';

export const MultySelectField = (fieldProps) => {
  const {
    fieldName,
    type,
    placeholder,
    label,
    onChange,
    onBlur,
    error,
    touched,
    options,
    required,
    selectMultyple,
    ...restProps
  } = fieldProps;

  console.log(restProps.value);

  const [optionsList, setOptionsList] = useState([]);
  const [selected, setSelected] = useState(restProps.value || []);
  const [values, setValues] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const inputFilter = ({ target: { value } }) => {
    const regexp = new RegExp(value.toLowerCase(), 'g');
    const filtered = options.filter(({ label }) => regexp.test(label.toLowerCase()));
    setOptionsList(filtered);
  };

  const handleCheckboxClick = useCallback(
    ({ target: { checked, value } }) => {
      if (checked) {
        const item = optionsList.find(({ key }) => key === value);
        setSelected([...selected, { key: item.key, label: item.label }]);
      } else {
        const newSelected = selected.filter(({ key }) => key !== value);
        setSelected(newSelected);
      }
    },
    [selected, optionsList]
  );

  useEffect(() => {
    Array.isArray(selected) && setValues(selected.map(({ label }) => label).join(', '));
  }, [selected]);

  useEffect(() => {
    setOptionsList(options);
  }, [options]);

  useEffect(() => {
    setSelected(restProps.value);
  }, [restProps.value]);

  return (
    <div className="multy-select-wrapper">
      <FloatingLabel label={`${label} ${required ? '*' : ''}`} className="mb-3">
        <Form.Control
          {...restProps}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          name={fieldName}
          id={fieldName}
          isInvalid={!!error && touched}
          value={values}
          onClick={() => setIsModalOpen(true)}
          className="select-input"
        />
        {error && touched && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
      </FloatingLabel>
      <Modal show={isModalOpen}>
        <FloatingLabel label="Почніть вводити текст">
          <Form.Control type="text" onChange={inputFilter} className="filter-input" />
        </FloatingLabel>
        <div className="scroll-container">
          <ListGroup as="ul">
            {optionsList.map(({ key, label }) => {
              return (
                <ListGroup.Item key={key} as="li">
                  <Form.Check
                    onChange={handleCheckboxClick}
                    name={key}
                    id={key}
                    value={key}
                    onBlur={onBlur}
                    label={label}
                    type="checkbox"
                    checked={Array.isArray(selected) && !!selected.find((item) => item.key === key)}
                  />
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </div>
        <CustomButton
          text="Зберегти"
          onClick={() => {
            setIsModalOpen(false);
            selectMultyple(fieldName, selected);
          }}
        />
      </Modal>
    </div>
  );
};
