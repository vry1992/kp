import React, { useCallback } from 'react';
import { FloatingLabel } from 'react-bootstrap';
import { MultySelectField } from './MultySelectField';
import Form from 'react-bootstrap/Form';
import './index.scss';

export function FormField(fieldProps) {
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
    ...restProps
  } = fieldProps;

  const renderTextField = () => (
    <Form.FloatingLabel label={`${label} ${required ? '*' : ''}`} className="mb-3">
      <Form.Control
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        name={fieldName}
        id={fieldName}
        onBlur={onBlur}
        isInvalid={!!error && touched}
        {...restProps}
      />
      {error && touched && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
    </Form.FloatingLabel>
  );

  const renderMonoSelectField = () => (
    <Form.FloatingLabel label={`${label} ${required ? '*' : ''}`} className="mb-3">
      <Form.Select
        aria-label="Default select example"
        value={restProps.value}
        disabled={restProps.disabled}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        name={fieldName}
        id={fieldName}
        onBlur={onBlur}
        isInvalid={!!error && touched}>
        <option>Оберіть один із варіантів</option>
        {options.map(({ key, label }) => {
          return (
            <option key={key} value={key}>
              {label}
            </option>
          );
        })}
      </Form.Select>
      {error && touched && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
    </Form.FloatingLabel>
  );

  const renderColorField = () => (
    <Form.FloatingLabel label={`${label} ${required ? '*' : ''}`}>
      <Form.Control
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        name={fieldName}
        id={fieldName}
        onBlur={onBlur}
        isInvalid={!!error && touched}
        {...restProps}
      />
    </Form.FloatingLabel>
  );

  const renderCheckboxField = () => {
    return (
      <Form.Group className="mb-3">
        <Form.Check
          onChange={onChange}
          name={fieldName}
          id={fieldName}
          onBlur={onBlur}
          label={label}
        />
      </Form.Group>
    );
  };

  const renderDateTimeField = () => {
    return (
      <div className="date-time-wrapper">
        <input
          id={fieldName}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          name={fieldName}
          value={restProps.value}
        />
        <label htmlFor={fieldName}>{`${label} ${required ? '*' : ''}`}</label>
        {restProps.value && (
          <span className="emit-date-time-value">
            {new Date(restProps.value).toLocaleDateString('UK', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hour12: false
            })}
          </span>
        )}
        {error && touched && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
      </div>
    );
  };

  const renderDateField = () => {
    return (
      <div className="date-time-wrapper">
        <input
          id={fieldName}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          name={fieldName}
          value={restProps.value}
        />
        <label htmlFor={fieldName}>{`${label} ${required ? '*' : ''}`}</label>
        {restProps.value && (
          <span className="emit-date-time-value">
            {new Date(restProps.value).toLocaleDateString('UK', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric'
            })}
          </span>
        )}
        {error && touched && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
      </div>
    );
  };

  const renderTextAreaField = () => {
    return (
      <FloatingLabel label={label}>
        <Form.Control
          as={type}
          placeholder={placeholder}
          onChange={onChange}
          name={fieldName}
          id={fieldName}
          onBlur={onBlur}
          className={error && touched && 'invalid-field'}
          style={{ height: '100px' }}
          value={restProps.value}
        />
        {error && touched && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
      </FloatingLabel>
    );
  };

  const renderMultySelect = useCallback(() => {
    return <MultySelectField {...fieldProps} />;
  }, [fieldProps]);

  return (
    <React.Fragment key={fieldName}>
      {(type === 'text' || type === 'number') && renderTextField()}
      {type === 'color' && renderColorField()}
      {type === 'select' && !restProps.multiple && renderMonoSelectField()}
      {type === 'select' && restProps.multiple && renderMultySelect()}
      {type === 'checkbox' && renderCheckboxField()}
      {type === 'datetime-local' && renderDateTimeField()}
      {type === 'date' && renderDateField()}
      {type === 'textarea' && renderTextAreaField()}
    </React.Fragment>
  );
}
