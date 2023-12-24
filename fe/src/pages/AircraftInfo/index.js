import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import { AddAircraftMap } from '../../components/AddAircraftMap';
import { AircraftInfoForm } from '../../components/AircraftInfoForm';
import { Headline } from '../../components/Headline';
import { CustomButton } from '../../components/CustomButton';
import { AircraftService } from '../../features/aircraft/services/AircraftService';
import { useLocation, useNavigate } from 'react-router-dom';

export const AircraftInfo = () => {
  const [latLngState, setLatLng] = useState({});
  const [polygone, setPolygone] = useState([]);
  const [polyline, setPolyline] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [dataToSubmit, setDataToSubmit] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setLatLng({
        lat: location.state.lat,
        lng: location.state.lng
      });

      // setPolygone(location.state.polygone);
      // setPolyline(location.state.polyline);
    }
  }, [location.state]);

  const onCreate = (latlng) => {
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
    await AircraftService.postData({
      ...dataToSubmit,
      discoverTimestamp: dataToSubmit.date,
      polygone,
      polyline,
      latitude: latLngState.lat,
      longitude: latLngState.lng
    });

    navigate('/map');
  };

  return (
    <div>
      <Headline text={'Введіть інформацію про виявлений літак'} />
      <AircraftInfoForm onFormChange={onFormChange} initData={location.state} />
      <AddAircraftMap
        onCreate={onCreate}
        onEdit={onEdit}
        currLatLng={latLngState}
        currPolygone={polygone}
        currPolyline={polyline}
        data={location.state}
      />

      <CustomButton
        text={'Зберегти'}
        disabled={!isFormValid || !latLngState.lat || !latLngState.lng}
        onClick={onSubmit}
      />
    </div>
  );
};
