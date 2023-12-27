import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import { AddAircraftMap } from '../../components/AddAircraftMap';
import { AircraftInfoForm } from '../../components/AircraftInfoForm';
import { Headline } from '../../components/Headline';
import { CustomButton } from '../../components/CustomButton';
import { AircraftService } from '../../features/aircraft/services/AircraftService';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader } from '../../components/Loader';

export const AircraftInfo = () => {
  const [latLngState, setLatLng] = useState({});
  const [polygone, setPolygone] = useState([]);
  const [polyline, setPolyline] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [dataToSubmit, setDataToSubmit] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const createdPolygone = useRef(null);
  const createdPolyline = useRef(null);

  const onCreate = (latlng) => {
    if (Array.isArray(latlng)) {
      if (Array.isArray(latlng[0])) {
        createdPolygone.current = latlng;
      } else {
        createdPolyline.current = latlng;
      }
    } else {
      setLatLng(latlng);
    }
  };

  const onEdit = (latlng) => {
    if (Array.isArray(latlng)) {
      if (Array.isArray(latlng[0])) {
        setPolygone(latlng);
      } else {
        setPolyline(latlng);
      }
    } else {
      setLatLng(latlng);
    }
  };

  const onFormChange = (values, isReady) => {
    isFormValid !== isReady && setIsFormValid(isReady);
    setDataToSubmit(values);
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      await AircraftService.postData({
        ...dataToSubmit,
        discoverTimestamp: dataToSubmit.date,
        polygone: createdPolygone.current || polygone,
        polyline: createdPolyline.current || polyline,
        latitude: latLngState.lat,
        longitude: latLngState.lng
      });
      navigate('/map');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (location.state) {
      setLatLng({
        lat: location.state.lat || location.state.latitude,
        lng: location.state.lng || location.state.longitude
      });
    }
  }, [location.state]);

  return (
    <div>
      {isLoading && <Loader />}
      <Headline text={'Введіть інформацію про виявлений літак'} />
      <AircraftInfoForm onFormChange={onFormChange} initData={location.state} />
      <CustomButton
        text={'Зберегти'}
        disabled={!isFormValid || !latLngState.lat || !latLngState.lng}
        onClick={onSubmit}
      />
      <br />
      <AddAircraftMap
        onCreate={onCreate}
        onEdit={onEdit}
        currLatLng={latLngState}
        currPolygone={polygone}
        currPolyline={polyline}
        data={location.state}
      />
    </div>
  );
};
