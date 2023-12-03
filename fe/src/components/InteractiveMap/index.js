/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Marker,
  MapContainer,
  TileLayer,
  useMapEvents,
  Popup,
  Polyline,
  Tooltip
} from 'react-leaflet';
import L from 'leaflet';
import { shipTypes } from '../../constants';
import { coordinatesConverterBack, parseDate } from '../../helpers';
import { CustomButton } from '../CustomButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteShipItemData, editShipData, filterShips } from '../../actions/ships';
import { getFilterShipData } from '../../selectors';
import { SEARCH_KEY } from '../../constants/searchForm';
import { UpdateOrCreateNewPopup } from '../UpdateOrCreatePopup';
import './index.scss';
import { ClickOnMapPopup } from '../ClickOnMapPopup';

const defaultZoom = 6;

const MapContent = ({ data, settings }) => {
  const [, setZoom] = useState(defaultZoom);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [content, setContent] = useState(data);
  const ships = useSelector(getFilterShipData);
  const draggedItem = useRef(null);
  const [updateOrCreatePopup, setUpdateOrCreatePopup] = useState(false);
  const [clickOnMapPopup, setClickOnMapPopup] = useState(false);
  const [routes, setRoutes] = useState({});
  const [clickCoordinates, setClickCoordinates] = useState(null);

  const map = useMapEvents({
    dblclick(e) {
      setClickOnMapPopup(true);
      setClickCoordinates(e.latlng);
    }
  });

  useEffect(() => {
    if (settings.showLast) {
      const groupedByDate = content.reduce((acc, curr) => {
        const existed = acc[curr.shipName] ? acc[curr.shipName] : [];
        acc[curr.shipName] = [...existed, curr]
          .sort(
            (a, b) =>
              new Date(b.discoverTimestamp).getTime() - new Date(a.discoverTimestamp).getTime()
          )
          .slice(0, 1);
        return acc;
      }, {});

      setContent(Object.values(groupedByDate).flat());
    } else {
      setContent([]);
    }
  }, [settings.showLast]);

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

  const iconPerson = (markerData) =>
    new L.DivIcon({
      html: `<div style="position: relative"><p style="position: absolute;z-index:1;text-align:center;width:100%;transform: translateY(45%);color:#ffffff">${
        shipTypes[markerData.shipType]?.short || ''
      }</p><img src="${process.env.PUBLIC_URL}/images/signs/emptyShip.svg"></div>`,
      // html: ShipIcon(),
      iconSize: [35, 35],
      className: 'leaflet-div-icon'
    });

  const getShipsRoutes = useCallback(
    (data) => {
      return data.reduce((acc, curr) => {
        if (!curr.latitude || !curr.longitude) return acc;
        const alreadyExistWithThiId = acc[curr.shipId] || [];
        const data = {
          lat: curr.latitude,
          lng: curr.longitude,
          color: alreadyExistWithThiId.length
            ? curr.shipId[0].color
            : `#${Math.floor(Math.random() * 16777215).toString(16)}`
        };
        return {
          ...acc,
          [curr.shipId]: [...alreadyExistWithThiId, data]
        };
      }, {});
    },
    [content]
  );

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
      const { latitude, longitude, dataId, shipId } = draggedItem.current;
      submitUpdatedPosition({
        latitude,
        longitude,
        id: dataId
      });
      setUpdateOrCreatePopup(false);
    }
  };

  const markerEventHandlers = useCallback(
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

  const onCreateNew = () => {
    navigate(`/ship-info`, {
      state: {
        ...draggedItem.current,
        latitudeMinutes: coordinatesConverterBack(draggedItem.current.latitude).min,
        latitudeDegs: coordinatesConverterBack(draggedItem.current.latitude).deg,
        longitudeDegs: coordinatesConverterBack(draggedItem.current.longitude).deg,
        longitudeMinutes: coordinatesConverterBack(draggedItem.current.longitude).min
      }
    });
  };

  const onShowRouteClick = useCallback(
    (marker) => {
      const { shipId } = marker;
      if (routes[shipId]) {
        const newRoutes = { ...routes };
        delete newRoutes[shipId];
        setRoutes(newRoutes);
        return;
      }
      const currentShip = content.filter((contentItem) => contentItem.shipId === shipId);
      const shipRoutes = getShipsRoutes(currentShip);
      setRoutes({ ...routes, ...shipRoutes });
    },
    [routes, getShipsRoutes]
  );

  const onConfirmAddNewOnClick = () => {
    navigate(`/ship-info`, {
      state: {
        latitudeMinutes: coordinatesConverterBack(clickCoordinates.lat).min,
        latitudeDegs: coordinatesConverterBack(clickCoordinates.lat).deg,
        longitudeDegs: coordinatesConverterBack(clickCoordinates.lng).deg,
        longitudeMinutes: coordinatesConverterBack(clickCoordinates.lng).min
      }
    });
    setClickOnMapPopup(false);
  };

  return (
    <>
      <UpdateOrCreateNewPopup
        show={updateOrCreatePopup}
        onMoveCurrentPress={onMoveCurrentPress}
        onCancel={onCancelUpdateOrCreatePopup}
        onCreateNew={onCreateNew}
      />
      <ClickOnMapPopup
        show={clickOnMapPopup}
        onConfirm={onConfirmAddNewOnClick}
        onCancel={() => setClickOnMapPopup(false)}
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
            icon={iconPerson(item)}
            eventHandlers={markerEventHandlers(item)}
            draggable={true}>
            <>
              <Tooltip permanent={true} direction="right" offset={{ x: 5, y: 0 }}>
                <strong>{item.shipName}</strong>
              </Tooltip>
              <Popup closeButton={false}>
                <strong>{item.shipName}</strong>
                <p>Виялений {parseDate(item.discoverTimestamp)}</p>
                <div className="d-flex justify-content-around">
                  {item.shipProject ? (
                    <CustomButton
                      onClick={() => onEditClick(item)}
                      iconPath={`${process.env.PUBLIC_URL}/images/icons/pencil.png`}
                      size="sm"
                    />
                  ) : null}

                  <CustomButton
                    onClick={() => onDeleteClick(item)}
                    iconPath={`${process.env.PUBLIC_URL}/images/icons/delete.png`}
                    size="sm"
                  />

                  {item.shipProject ? (
                    <CustomButton
                      onClick={() => onShowRouteClick(item)}
                      iconPath={`${process.env.PUBLIC_URL}/images/icons/route.png`}
                      size="sm"
                    />
                  ) : null}
                </div>
              </Popup>
            </>
          </Marker>
        ) : null;
      })}
      {Object.values(routes).map((route, index) => {
        const { color } = route[0];
        return (
          <Polyline key={index} pathOptions={{ color }} positions={[...route]} noClip={true} />
        );
      })}
    </>
  );
};

export const InteractiveMap = ({ data, settings }) => {
  return (
    <MapContainer center={[44.2976268, 31.7484256]} zoom={defaultZoom} cli>
      <MapContent data={data} settings={settings} />
    </MapContainer>
  );
};
