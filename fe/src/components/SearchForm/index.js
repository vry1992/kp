import React, { useCallback, useEffect } from 'react';
import { useFormik } from 'formik';
import { Col, Row } from 'react-bootstrap';
import { FormField } from '../FormField';
import { SEARCH_KEY, searchFormFields } from '../../constants/searchForm';
import { useForm } from '../../hooks/useForm';
import { useValidation } from '../../hooks/useValidation';
import { CustomButton } from '../CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { filterShips } from '../../actions/ships';
import { getSelectOptionsFromArray, getShipsSelectOptionsFromArray } from '../../helpers';
import {
  getShipNamesOptions,
  getCallSignsOptions,
  getPersonsWhoAddedOptions
} from '../../selectors';

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
const storage = localStorage.getItem(SEARCH_KEY);
const storedFilters = storage ? JSON.parse(storage) : initialValues;

export function SearchForm() {
  const { validationSchema } = useValidation(searchFormFields);
  const { checkIsFormValid } = useForm(searchFormFields);
  const shipNamesOptions = useSelector(getShipNamesOptions);
  const callSignsOptions = useSelector(getCallSignsOptions);
  const personsWhoAddedOptions = useSelector(getPersonsWhoAddedOptions);
  const dispatch = useDispatch();

  const { values, handleSubmit, handleBlur, handleChange, touched, errors, setFieldValue } =
    useFormik({
      initialValues: {
        dateTo: new Date(storedFilters.dateTo) || defaultDateTo,
        dateFrom: new Date(storedFilters.dateFrom) || defaultDateFrom,
        shipNameList: storedFilters.shipNameList || [],
        frequency: storedFilters.frequency || '',
        shipCallsignList: storedFilters.shipCallsignList || [],
        personNameList: storedFilters.personNameList || []
      },
      validationSchema,
      onSubmit
    });

  function onSubmit(values) {
    const { frequency, personNameList, shipNameList, shipCallsignList, dateFrom, dateTo } = values;
    const dataToSubmit = {
      ...(frequency && { frequency }),
      personNameList: personNameList ? personNameList.map(({ label }) => label) : [],
      shipNameList: shipNameList ? shipNameList.map(({ key }) => key) : [],
      shipCallsignList: shipCallsignList ? shipCallsignList.map(({ label }) => label) : [],
      dateTo: new Date(dateTo).getTime(),
      dateFrom: new Date(dateFrom).getTime()
    };
    localStorage.setItem(SEARCH_KEY, JSON.stringify({ ...values }));
    dispatch(
      filterShips({
        data: dataToSubmit,
        onSuccess: () => console.log('success'),
        onError: () => console.log('error')
      })
    );
  }

  const getMultyselectOptions = useCallback(
    (name) => {
      if (name === searchFormFields.shipNameList.fieldName) {
        return getShipsSelectOptionsFromArray(shipNamesOptions || []);
      } else if (name === searchFormFields.shipCallsignList.fieldName)
        return getSelectOptionsFromArray(callSignsOptions || []);
      else if (name === searchFormFields.personNameList.fieldName)
        return getSelectOptionsFromArray(personsWhoAddedOptions || []);
    },
    [shipNamesOptions, callSignsOptions, personsWhoAddedOptions]
  );

  const renderField = useCallback(
    ({ name, onChange, columnWidth = 10, ...restProps }) => {
      return (
        <Col xs={columnWidth} key={name}>
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
      <Row className="justify-content-md-center">
        <Col xs={10}>
          <CustomButton text="Пошук" type="submit" />
        </Col>
      </Row>
    </form>
  );
}
