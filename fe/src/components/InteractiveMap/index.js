import React, { useState } from 'react';
import { Marker, MapContainer, TileLayer, useMapEvents, Popup } from 'react-leaflet';
import L from 'leaflet';
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

  const iconPerson = new L.Icon({
    iconUrl: `${process.env.PUBLIC_URL}/images/signs/aaa.svg`,
    iconRetinaUrl: `${process.env.PUBLIC_URL}/images/signs/aaa.svg`,
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(150, 150),
    className: 'leaflet-div-icon'
  });

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
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ) : null;
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
