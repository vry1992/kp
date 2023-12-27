/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Marker, useMapEvents, Popup, Polyline, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { shipTypes } from '../../../constants';
import { parseDate } from '../../../helpers';
import { CustomButton } from '../../CustomButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SEARCH_KEY } from '../../../constants/searchForm';
import { UpdateOrCreateNewPopup } from '../../UpdateOrCreatePopup';
import { ClickOnMapPopup } from '../../ClickOnMapPopup';
import { DUTY_INFO_STORAGE_KEY } from '../../../pages/DutyInfo';
import { Loader } from '../../Loader';
import { filterShipsDataThunk } from '../../../features/shipsData/store/shipsDataThunk';
import { shipsDataListSelector } from '../../../features/shipsData/store/shipsDataSelectors';
import { ShipsDataService } from '../../../features/shipsData/services/ShipsDataService';

const defaultZoom = 6;

export const ShipsLayer = ({ settings }) => {
  const [, setZoom] = useState(defaultZoom);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [content, setContent] = useState([]);
  const shipsData = useSelector(shipsDataListSelector);
  const draggedItem = useRef(null);
  const [updateOrCreatePopup, setUpdateOrCreatePopup] = useState(false);
  const [clickOnMapPopup, setClickOnMapPopup] = useState(false);
  const [routes, setRoutes] = useState({});
  const [clickCoordinates, setClickCoordinates] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useMapEvents({
    dblclick(e) {
      setClickOnMapPopup(true);
      setClickCoordinates(e.latlng);
    }
  });

  const fetchData = () => {
    const filters = localStorage.getItem(SEARCH_KEY);
    const dutyInfo = localStorage.getItem(DUTY_INFO_STORAGE_KEY);
    if (filters) {
      const dataToSubmit = JSON.parse(filters);
      setIsLoading(true);
      dispatch(
        filterShipsDataThunk({
          ...dataToSubmit,
          dateTo: new Date(dataToSubmit.dateTo).toISOString(),
          dateFrom: new Date(dataToSubmit.dateFrom).toISOString(),
          shipNameList: dataToSubmit?.shipNameList?.map(({ key }) => key) || []
        })
      );
    } else if (!filters && dutyInfo) {
      setIsLoading(true);
      const { dutyStartDate } = JSON.parse(dutyInfo);
      const dateFrom = new Date(dutyStartDate).toISOString();
      const dateTo = new Date().toISOString();
      dispatch(filterShipsDataThunk({ dateTo, dateFrom }));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    Array.isArray(shipsData) && setContent(shipsData);
  }, [shipsData]);

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
      Array.isArray(shipsData) && setContent(shipsData);
    }
  }, [settings.showLast, shipsData]);

  const mapEvents = useMapEvents({
    zoomend: () => {
      setZoom(mapEvents.getZoom());
    }
  });

  const shipIcon = (markerData) =>
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

  const onDeleteClick = async ({ dataId }) => {
    await ShipsDataService.deleteShipData(dataId);
    fetchData();
  };

  const submitUpdatedPosition = async (data) => {
    await ShipsDataService.editShipData(data);
    fetchData();
  };

  const onMoveCurrentPress = () => {
    if (draggedItem.current) {
      const { latitude, longitude, dataId } = draggedItem.current;
      submitUpdatedPosition({
        ...draggedItem.current,
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
      state: draggedItem.current
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

  const onConfirmAddNewShipOnClick = () => {
    navigate(`/ship-info`, {
      state: clickCoordinates
    });
    setClickOnMapPopup(false);
  };

  const onConfirmAddNewPlaneOnClick = () => {
    navigate(`/aircraft`, {
      state: clickCoordinates
    });
    setClickOnMapPopup(false);
  };

  return (
    <>
      {isLoading && <Loader />}
      <UpdateOrCreateNewPopup
        show={updateOrCreatePopup}
        onMoveCurrentPress={onMoveCurrentPress}
        onCancel={onCancelUpdateOrCreatePopup}
        onCreateNew={onCreateNew}
      />
      <ClickOnMapPopup
        show={clickOnMapPopup}
        onConfirmShip={onConfirmAddNewShipOnClick}
        onConfirmPlane={onConfirmAddNewPlaneOnClick}
        onCancel={() => setClickOnMapPopup(false)}
      />
      {content.map((item) => {
        return item.latitude && item.longitude ? (
          <Marker
            key={item.dataId}
            position={[item.latitude, item.longitude]}
            icon={shipIcon(item)}
            eventHandlers={markerEventHandlers(item)}
            draggable={true}>
            <>
              <Tooltip permanent={true} direction="right" offset={{ x: 5, y: 0 }}>
                <strong>{item.shipName}</strong>
              </Tooltip>
              <Popup closeButton={false}>
                <strong>{item.shipName}</strong>
                <strong>Проєкт: {item.shipProject}</strong>
                <p>Виялений {parseDate(item.discoverTimestamp)}</p>
                <div className="d-flex justify-content-around">
                  <CustomButton
                    onClick={() => onEditClick(item)}
                    iconPath={`${process.env.PUBLIC_URL}/images/icons/pencil.png`}
                    size="sm"
                  />

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
