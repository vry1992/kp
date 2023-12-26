import React, { useCallback, useEffect } from 'react';
import { useFormik } from 'formik';
import { Col, Row } from 'react-bootstrap';
import { FormField } from '../FormField';
import { SEARCH_KEY, searchFormFields } from '../../constants/searchForm';
import { useForm } from '../../hooks/useForm';
import { useValidation } from '../../hooks/useValidation';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectOptionsFromArray, getShipsSelectOptionsFromArray } from '../../helpers';
import { filterShipsDataThunk } from '../../features/shipsData/store/shipsDataThunk';
import { filterAircraftThunk } from '../../features/aircraft/store/aircraftThunk';

const defaultDateFrom = new Date(
  new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).setHours(0, 0, 0, 0)
);

const defaultDateTo = new Date(new Date(Date.now() + 1000 * 60 * 60 * 24).setHours(23, 59, 59));

const initialValues = {
  shipNameList: [],
  frequency: '',
  shipCallsignList: [],
  personNameList: [],
  dateFrom: defaultDateFrom,
  dateTo: defaultDateTo
};

export function SearchForm() {
  const { validationSchema } = useValidation(searchFormFields);
  const { checkIsFormValid } = useForm(searchFormFields);
  const shipNamesOptions = useSelector(() => []);
  const callSignsOptions = useSelector(() => []);
  const personsWhoAddedOptions = useSelector(() => []);
  const dispatch = useDispatch();

  const {
    values,
    handleSubmit,
    handleBlur,
    handleChange,
    touched,
    errors,
    setFieldValue,
    setValues
  } = useFormik({
    initialValues: {
      dateTo: new Date(initialValues.dateTo).toISOString(),
      dateFrom: new Date(initialValues.dateFrom).toISOString(),
      shipNameList: initialValues.shipNameList || [],
      frequency: initialValues.frequency || '',
      shipCallsignList: initialValues.shipCallsignList || [],
      personNameList: initialValues.personNameList || []
    },
    validationSchema,
    onSubmit
  });

  useEffect(() => {
    const storage = localStorage.getItem(SEARCH_KEY);
    if (storage) {
      const storedFilters = JSON.parse(storage);
      setValues(storedFilters);
      onSubmit(storedFilters);
    }
  }, []);

  // useEffect(() => {
  //   localStorage.setItem(SEARCH_KEY, JSON.stringify(values));
  //   window.dispatchEvent(new Event('storage'));
  //   onSubmit(values);
  // }, [values]);

  function onSubmit(values) {
    const { frequency, personNameList, shipNameList, shipCallsignList, dateFrom, dateTo } = values;
    const dataToSubmit = {
      ...(frequency && { frequency }),
      personNameList: personNameList ? personNameList.map(({ label }) => label) : [],
      shipNameList: shipNameList ? shipNameList.map(({ key }) => key) : [],
      shipCallsignList: shipCallsignList ? shipCallsignList.map(({ label }) => label) : [],
      dateTo: new Date(dateTo).toISOString(),
      dateFrom: new Date(dateFrom).toISOString()
    };

    dispatch(filterShipsDataThunk(dataToSubmit));
    dispatch(
      filterAircraftThunk({
        dateTo: dataToSubmit.dateTo,
        dateFrom: dataToSubmit.dateFrom
      })
    );
  }

  const getMultyselectOptions = useCallback(
    (name) => {
      if (name === searchFormFields.shipNameList?.fieldName) {
        return getShipsSelectOptionsFromArray(shipNamesOptions || []);
      } else if (name === searchFormFields.shipCallsignList?.fieldName)
        return getSelectOptionsFromArray(callSignsOptions || []);
      else if (name === searchFormFields.personNameList?.fieldName)
        return getSelectOptionsFromArray(personsWhoAddedOptions || []);
    },
    [shipNamesOptions, callSignsOptions, personsWhoAddedOptions]
  );

  const renderField = useCallback(
    ({ name, onChange, ...restProps }) => {
      return (
        <Col xs={12} key={name}>
          <FormField
            name={name}
            onChange={onChange}
            value={values[name]}
            error={errors[name]}
            touched={touched[name]}
            onBlur={handleBlur}
            {...restProps}
          />
        </Col>
      );
    },
    [values, handleBlur]
  );

  function onChangeDate({ target: { name, value } }) {
    setFieldValue(name, value);
    localStorage.setItem(SEARCH_KEY, JSON.stringify({ ...values, [name]: value }));
    window.dispatchEvent(new Event('storage'));
    onSubmit({ ...values, [name]: value });
  }

  function selectMultyple(name, selected) {
    setFieldValue(name, selected);
  }

  const renderSearchForm = useCallback(() => {
    return Object.entries(searchFormFields).map(([name, props]) => {
      return renderField({
        name,
        onChange: handleChange,
        ...(props.type === 'datetime-local' && { onChange: onChangeDate }),
        ...(props.multiple && { selectMultyple }),
        ...props,
        options: getMultyselectOptions(name)
      });
    });
  }, [values, getMultyselectOptions, renderField]);

  useEffect(() => {
    checkIsFormValid(errors, values);
  }, [values, errors]);

  return (
    <form onSubmit={handleSubmit}>
      <Row className="justify-content-md-center">{renderSearchForm()}</Row>
    </form>
  );
}
