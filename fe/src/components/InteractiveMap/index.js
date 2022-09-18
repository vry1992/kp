import React, { useCallback, useState } from 'react';
import { Marker, MapContainer, TileLayer, useMapEvents, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { shipTypes } from '../../constants';
import { parseDate } from '../../helpers';
import 'leaflet-polylinedecorator';
import './index.scss';

const defaultZoom = 6;

const MapContent = ({ data }) => {
  const [zoom, setZoom] = useState(defaultZoom);

  const mapEvents = useMapEvents({
    zoomend: () => {
      console.log(zoom);
      setZoom(mapEvents.getZoom());
    }
  });

  const iconPerson = new L.DivIcon({
    html: `<img src="${process.env.PUBLIC_URL}/images/signs/aaa.svg">`,
    iconSize: [30, 30],
    className: 'leaflet-div-icon'
  });

  const getShipsRoutes = useCallback(() => {
    return data.reduce((acc, curr) => {
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
  }, [data]);

  return (
    <>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url={`${process.env.PUBLIC_URL}/{z}/{x}/{y}.png`}
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data.map((item) => {
        return item.latitude && item.longitude ? (
          <Marker key={item.dataId} position={[item.latitude, item.longitude]} icon={iconPerson}>
            <Popup closeButton={false}>
              <strong>
                {shipTypes[item.shipType].name} &ldquo;{item.shipName}&rdquo;
              </strong>
              <p>Виялений {parseDate(+item.discoverTimestamp)}</p>
            </Popup>
          </Marker>
        ) : null;
      })}
      {Object.values(getShipsRoutes(data)).map((route, index) => {
        const { color } = route[0];
        console.log(color);
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
