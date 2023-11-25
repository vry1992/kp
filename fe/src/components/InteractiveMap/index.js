/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Marker, MapContainer, TileLayer, useMapEvents, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { shipTypes } from '../../constants';
import { parseDate } from '../../helpers';
import { CustomButton } from '../CustomButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteShipItemData, editShipData, filterShips } from '../../actions/ships';
import { getFilterShipData } from '../../selectors';
import { SEARCH_KEY } from '../../constants/searchForm';
import { UpdateOrCreateNewPopup } from '../UpdateOrCreatePopup';
import './index.scss';

const defaultZoom = 6;

const MapContent = ({ data }) => {
  const [, setZoom] = useState(defaultZoom);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [content, setContent] = useState(data);
  const ships = useSelector(getFilterShipData);
  const draggedItem = useRef(null);
  const [updateOrCreatePopup, setUpdateOrCreatePopup] = useState(false);

  useEffect(() => {
    setContent(ships);
  }, [ships]);

  useEffect(() => {
    if (!content?.length) {
      const filters = localStorage.getItem(SEARCH_KEY);
      if (filters) {
        const dataToSubmit = JSON.parse(filters);
        dispatch(
          filterShips({
            data: {
              ...dataToSubmit,
              dateTo: new Date(dataToSubmit.dateTo).getTime(),
              dateFrom: new Date(dataToSubmit.dateFrom).getTime(),
              shipNameList: dataToSubmit?.shipNameList?.map(({ key }) => key) || []
            }
          })
        );
      }
    }
  }, [content]);

  const mapEvents = useMapEvents({
    zoomend: () => {
      setZoom(mapEvents.getZoom());
    }
  });

  const iconPerson = new L.DivIcon({
    html: `<img src="${process.env.PUBLIC_URL}/images/signs/aaa.svg">`,
    iconSize: [30, 30],
    className: 'leaflet-div-icon'
  });

  const getShipsRoutes = useCallback(() => {
    // return content.reduce((acc, curr) => {
    //   if (!curr.latitude || !curr.longitude) return acc;
    //   const alreadyExistWithThiId = acc[curr.shipId] || [];
    //   const data = {
    //     lat: curr.latitude,
    //     lng: curr.longitude,
    //     color: alreadyExistWithThiId.length
    //       ? curr.shipId[0].color
    //       : `#${Math.floor(Math.random() * 16777215).toString(16)}`
    //   };
    //   return {
    //     ...acc,
    //     [curr.shipId]: [...alreadyExistWithThiId, data]
    //   };
    // }, {});

    return {};
  }, [content]);

  const onCancelUpdateOrCreatePopup = () => {
    setUpdateOrCreatePopup(false);
  };

  const onEditClick = ({ dataId }) => {
    navigate(`/ship-info/edit/${dataId}`);
  };

  const onDeleteClick = ({ dataId }) => {
    dispatch(deleteShipItemData(dataId));
  };

  const submitUpdatedPosition = (data) => {
    dispatch(editShipData({ data }));
  };

  const onMoveCurrentPress = () => {
    if (draggedItem.current) {
      const { latitude, longitude, dataId } = draggedItem.current;
      submitUpdatedPosition({
        latitude,
        longitude,
        id: dataId
      });
      setUpdateOrCreatePopup(false);
    }
  };

  const eventHandlers = useCallback(
    (item) => ({
      dragend(e) {
        draggedItem.current = {
          ...item,
          latitude: e.target.getLatLng().lat,
          longitude: e.target.getLatLng().lng
        };
        setUpdateOrCreatePopup(true);
      }
    }),
    [content]
  );

  return (
    <>
      <UpdateOrCreateNewPopup
        show={updateOrCreatePopup}
        onMoveCurrentPress={onMoveCurrentPress}
        onCancel={onCancelUpdateOrCreatePopup}
      />
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url={`${process.env.PUBLIC_URL}/{z}/{x}/{y}.png`}
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {content.map((item) => {
        return item.latitude && item.longitude ? (
          <Marker
            key={item.dataId}
            position={[item.latitude, item.longitude]}
            icon={iconPerson}
            eventHandlers={eventHandlers(item)}
            draggable={true}
            title={'okok'}>
            <>
              <Popup closeButton={false}>
                <strong>
                  {shipTypes[item.shipType].name} &ldquo;{item.shipName}&rdquo;
                </strong>
                <p>Виялений {parseDate(+item.discoverTimestamp)}</p>
                <div>
                  <CustomButton
                    onClick={() => onEditClick(item)}
                    iconPath={`${process.env.PUBLIC_URL}/images/icons/pencil.png`}
                    size="sm"
                  />{' '}
                  <CustomButton
                    onClick={() => onDeleteClick(item)}
                    iconPath={`${process.env.PUBLIC_URL}/images/icons/delete.png`}
                    size="sm"
                  />
                </div>
              </Popup>
            </>
          </Marker>
        ) : null;
      })}
      {Object.values(getShipsRoutes(content)).map((route, index) => {
        const { color } = route[0];
        return (
          <Polyline key={index} pathOptions={{ color }} positions={[...route]} noClip={true} />
        );
      })}
    </>
  );
};

export const InteractiveMap = ({ data }) => {
  return (
    <MapContainer center={[44.2976268, 31.7484256]} zoom={defaultZoom}>
      <MapContent data={data} />
    </MapContainer>
  );
};
