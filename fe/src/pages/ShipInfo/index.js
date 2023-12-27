import React, { useEffect, useState } from 'react';
import { Headline } from '../../components/Headline';
import './index.scss';
import { CustomButton } from '../../components/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { getShipsThunk } from '../../features/ships/store/shipsThunk';
import { shipsListSelector } from '../../features/ships/store/shipsSelectors';
import { ShipInfoForm } from '../../components/ShipInfoForm';
import { AddShipMap } from '../../components/AddShipMap';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { postShipsDataThunk } from '../../features/shipsData/store/shipsDataThunk';

export function ShipInfo() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const shipsList = useSelector(shipsListSelector);
  const [shipSelectorData, setShipSelectorData] = useState({});
  const [latLngState, setLatLng] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [dataToSubmit, setDataToSubmit] = useState({});

  useEffect(() => {
    dispatch(getShipsThunk());
  }, []);

  useEffect(() => {
    if (location.state) {
      setLatLng({
        lat: location.state?.lat || location.state?.latitude,
        lng: location.state?.lng || location.state?.longitude
      });
    }
  }, [location]);

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

  const onSubmit = async () => {
    const { types, ...rest } = dataToSubmit;
    const typesKeys = Object.entries(types);
    const isUnknownType =
      typesKeys.length > 1 ||
      typesKeys[0][1].length > 1 ||
      typesKeys.some(([, shipsSelected]) => {
        return shipsSelected.some(({ label }) => label === 'н/в');
      });
    if (!isUnknownType) {
      await dispatch(
        postShipsDataThunk({
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
        })
      );
    } else {
      await dispatch(
        postShipsDataThunk({
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
        })
      );
    }

    navigate('/map');
  };

  return (
    <div>
      <Headline text={'Введіть інформацію про виявлений корабель'} />
      <ShipInfoForm
        onFormChange={onFormChange}
        shipsListData={shipSelectorData}
        initData={location.state}
      />
      <CustomButton
        text={'Зберегти'}
        disabled={!isFormValid || !latLngState.lat || !latLngState.lng}
        onClick={onSubmit}
      />
      <br />
      <AddShipMap
        onCreate={onCreate}
        onEdit={onEdit}
        lat={latLngState?.lat}
        lng={latLngState?.lng}
      />
    </div>
  );
}
