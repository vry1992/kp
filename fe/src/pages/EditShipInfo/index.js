import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CustomButton } from '../../components/CustomButton';
import { ShipsDataService } from '../../features/shipsData/services/ShipsDataService';
import './index.scss';
import { Headline } from '../../components/Headline';
import { AddShipMap } from '../../components/AddShipMap';
import { getShipsThunk } from '../../features/ships/store/shipsThunk';
import { shipsListSelector } from '../../features/ships/store/shipsSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { EditShipInfoForm } from '../../components/EditShipInfoForm';
import { Loader } from '../../components/Loader';

export function EditShipInfo() {
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shipsList = useSelector(shipsListSelector);
  const [shipSelectorData, setShipSelectorData] = useState({});
  const [latLngState, setLatLng] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [dataToSubmit, setDataToSubmit] = useState({});
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(getShipsThunk());
  }, []);

  useEffect(() => {
    if (location.state?.lat && location.state?.lng) {
      setLatLng({
        lat: location.state?.lat,
        lng: location.state?.lng
      });
    }
  }, [location.state]);

  useEffect(() => {
    const grouped = shipsList.reduce((acc, curr) => {
      const existed = acc[curr.ship_type] || [
        { ship_name: 'н/в', ship_id: uuidv4(), ship_type: curr.ship_type }
      ];
      return {
        ...acc,
        [curr.ship_type]: [...existed, curr]
      };
    }, {});
    setShipSelectorData(grouped);
  }, [shipsList]);

  const onCreate = (latlng) => {
    setLatLng(latlng);
  };

  const onEdit = (latlng) => {
    setLatLng(latlng);
  };

  const onFormChange = (values, isReady) => {
    isFormValid !== isReady && setIsFormValid(isReady);
    setDataToSubmit(values);
  };

  const onSubmit = () => {
    const { types, ...rest } = dataToSubmit;
    const typesKeys = Object.entries(types);
    const isUnknownType =
      typesKeys.length > 1 ||
      typesKeys[0][1].length > 1 ||
      typesKeys.some(([, shipsSelected]) => {
        return shipsSelected.some(({ label }) => label === 'н/в');
      });
    if (!isUnknownType) {
      ShipsDataService.editShipData({
        id: params.id,
        shipId: typesKeys[0][1][0].value,
        discoverTimestamp: rest.date,
        personName: rest.personName,
        shipCallsign: rest.shipCallsign,
        companionCallsign: rest.companionCallsign,
        frequency: rest.frequency,
        peleng: rest.peleng,
        additionalInformation: rest.additionalInformation,
        latitude: latLngState.lat,
        longitude: latLngState.lng
      });
    } else {
      ShipsDataService.editShipData({
        id: params.id,
        discoverTimestamp: rest.date,
        personName: rest.personName,
        shipCallsign: rest.shipCallsign,
        companionCallsign: rest.companionCallsign,
        frequency: rest.frequency,
        peleng: rest.peleng,
        additionalInformation: rest.additionalInformation,
        latitude: latLngState.lat,
        longitude: latLngState.lng,
        data: JSON.stringify(
          typesKeys
            .map(([type, entr]) => entr.map((i) => ({ ...i, type })))
            .flat()
            .map(({ label, type, value }) => {
              return {
                shipId: label !== 'н/в' ? value : '',
                shipName: label,
                type
              };
            })
        )
      });
    }

    navigate('/map');
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const res = await ShipsDataService.getShipDataById(params.id);
        setLatLng({
          lat: res.latitude,
          lng: res.longitude
        });
        setData(res);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [location.state]);

  return (
    <>
      {isLoading && <Loader />}
      <div className="ship-info">
        <Headline text={'Оновлення інформації про виявлений корабель'} />
        <EditShipInfoForm
          onFormChange={onFormChange}
          shipsListData={shipSelectorData}
          initData={data}
        />
        <AddShipMap
          onCreate={onCreate}
          onEdit={onEdit}
          lat={latLngState?.lat}
          lng={latLngState?.lng}
        />

        <CustomButton
          text={'Зберегти'}
          disabled={!isFormValid || !latLngState.lat || !latLngState.lng}
          onClick={onSubmit}
        />
      </div>
    </>
  );
}
