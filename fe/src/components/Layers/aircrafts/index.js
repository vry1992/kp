/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Marker, useMapEvents, Popup, Polyline, Tooltip, Polygon } from 'react-leaflet';
import L from 'leaflet';
import { parseDate } from '../../../helpers';
import { CustomButton } from '../../CustomButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SEARCH_KEY } from '../../../constants/searchForm';
import { UpdateOrCreateNewPopup } from '../../UpdateOrCreatePopup';
import { ClickOnMapPopup } from '../../ClickOnMapPopup';
import { DUTY_INFO_STORAGE_KEY } from '../../../pages/DutyInfo';
import { Loader } from '../../Loader';
import { ShipsDataService } from '../../../features/shipsData/services/ShipsDataService';
import { filterAircraftThunk } from '../../../features/aircraft/store/aircraftThunk';
import { aircraftsListSelector } from '../../../features/aircraft/store/aircraftSelectors';
import { AircraftService } from '../../../features/aircraft/services/AircraftService';

const defaultZoom = 6;

export const AircraftLayer = () => {
  const [, setZoom] = useState(defaultZoom);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [content, setContent] = useState([]);
  const aircraftData = useSelector(aircraftsListSelector);
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
        filterAircraftThunk({
          dateTo: new Date(dataToSubmit.dateTo).toISOString(),
          dateFrom: new Date(dataToSubmit.dateFrom).toISOString()
        })
      );
    } else if (!filters && dutyInfo) {
      setIsLoading(true);
      const { dutyStartDate } = JSON.parse(dutyInfo);
      const dateFrom = new Date(dutyStartDate).toISOString();
      const dateTo = new Date().toISOString();
      dispatch(filterAircraftThunk({ dateTo, dateFrom }));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    Array.isArray(aircraftData) && setContent(aircraftData);
  }, [aircraftData]);

  const mapEvents = useMapEvents({
    zoomend: () => {
      setZoom(mapEvents.getZoom());
    }
  });

  const planeIcon = (markerData) =>
    new L.DivIcon({
      html: `
      <svg
        width="24"
        height="40"
        viewBox="0 0 100 100"
        version="1.1"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style="transform:rotate(180deg)"
      >
        <path d="M0 0 L50 100 L100 0 Z" fill="red"></path>
      </svg>`,
      iconSize: [35, 35],
      className: 'leaflet-div-icon'
    });

  const onCancelUpdateOrCreatePopup = () => {
    setUpdateOrCreatePopup(false);
  };

  const onEditClick = ({ id }) => {
    navigate(`/aircraft-info/edit/${id}`);
  };

  const onDeleteClick = async ({ id }) => {
    await AircraftService.deleteOne(id);
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
    navigate(`/aircraft`, {
      state: draggedItem.current
    });
  };

  const onShowRouteClick = useCallback(
    (marker) => {
      console.log(marker);
    },
    [routes]
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
        onConfirmPlane={onConfirmAddNewPlaneOnClick}
        onConfirmShip={onConfirmAddNewShipOnClick}
        onCancel={() => setClickOnMapPopup(false)}
      />
      {content.map((item) => {
        return item.latitude && item.longitude ? (
          <>
            <Marker
              key={item.id}
              position={[item.latitude, item.longitude]}
              icon={planeIcon(item)}
              eventHandlers={markerEventHandlers(item)}
              draggable={true}>
              <>
                {item.polyline ? (
                  <Polyline
                    pathOptions={{
                      color: 'red',
                      dashArray: [5, 10],
                      fill: false
                    }}
                    positions={item.polyline.map(({ lat, lng }) => {
                      return [lat, lng];
                    })}
                  />
                ) : null}
                {item.polygone?.[0] ? (
                  <Polygon
                    pathOptions={{
                      color: 'red',
                      dashArray: [5, 10],
                      fill: false
                    }}
                    positions={item.polygone[0].map(({ lat, lng }) => {
                      return [lat, lng];
                    })}
                  />
                ) : null}
                <Tooltip permanent={true} direction="right" offset={{ x: 5, y: 0 }}>
                  <strong>
                    {Object.values(item.data)
                      .flat()
                      .map(({ label }) => label)
                      .join(' / ')}
                  </strong>
                </Tooltip>
                <Popup closeButton={false}>
                  <strong>
                    {Object.values(item.data)
                      .flat()
                      .map(({ label }) => label)
                      .join(' / ')}
                  </strong>
                  <p>Виялений {parseDate(item.discover_timestamp_utc)}</p>
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
          </>
        ) : null;
      })}
    </>
  );
};
