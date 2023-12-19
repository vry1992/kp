import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import { AddAircraftMap } from '../../components/AddAircraftMap';
import { AircraftInfoForm } from '../../components/AircraftInfoForm';
import { Headline } from '../../components/Headline';
import { CustomButton } from '../../components/CustomButton';

export const AircraftInfo = () => {
  const [latLngState, setLatLng] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [dataToSubmit, setDataToSubmit] = useState({});

  const onCreate = (latlng) => {
    setLatLng(latlng);
  };

  const onFormChange = (values, isReady) => {
    isFormValid !== isReady && setIsFormValid(isReady);
    setDataToSubmit(values);
  };

  const onSubmit = () => {
    console.log(dataToSubmit, latLngState);
  };

  return (
    <div>
      <Headline text={'Введіть інформацію про виявлений літак'} />
      <AircraftInfoForm onFormChange={onFormChange} />
      <AddAircraftMap onCreate={onCreate} />

      <CustomButton
        text={'Зберегти'}
        disabled={!isFormValid || !latLngState.length}
        onClick={onSubmit}
      />
    </div>
  );
};
