import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CustomButton } from '../../components/CustomButton';
import './index.scss';
import { Headline } from '../../components/Headline';
import { AddAircraftMap } from '../../components/AddAircraftMap';
import { AircraftService } from '../../features/aircraft/services/AircraftService';
import { EditAircraftInfoForm } from '../../components/EditAircraftInfoForm';

export function EditAircraftInfo() {
  const params = useParams();
  const navigate = useNavigate();
  const [latLngState, setLatLng] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [polygone, setPolygone] = useState([]);
  const [polyline, setPolyline] = useState([]);
  const [dataToSubmit, setDataToSubmit] = useState({});
  const [data, setData] = useState({});

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
    await AircraftService.patchData({
      ...dataToSubmit,
      polygone,
      polyline,
      latitude: latLngState.lat,
      longitude: latLngState.lng,
      id: params.id
    });
    navigate('/map');
  };

  useEffect(() => {
    const getData = async () => {
      const res = await AircraftService.getOne(params.id);
      setLatLng({
        lat: res.latitude,
        lng: res.longitude
      });
      setPolyline(res.polyline || []);
      setPolygone(res.polygone || []);
      setData(res);
    };
    getData();
  }, [params]);

  return (
    <div className="ship-info">
      <Headline text={'Оновлення інформації про виявлений літак'} />
      <EditAircraftInfoForm onFormChange={onFormChange} shipsListData={[]} initData={data} />

      {Object.keys(data).length && (
        <AddAircraftMap
          onCreate={onCreate}
          onEdit={onEdit}
          data={data}
          currLatLng={latLngState}
          currPolygone={polygone}
          currPolyline={polyline}
        />
      )}

      <CustomButton
        text={'Зберегти'}
        disabled={!isFormValid || !latLngState.lat || !latLngState.lng}
        onClick={onSubmit}
      />
    </div>
  );
}
