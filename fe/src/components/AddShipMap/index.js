import React from 'react';
import { MapContainer, TileLayer, FeatureGroup, Marker } from 'react-leaflet';
import L from 'leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

const icon = new L.DivIcon({
  html: `<img src="${process.env.PUBLIC_URL}/images/signs/emptyShip.svg">`,
  iconSize: [35, 35],
  className: 'leaflet-div-icon'
});

export const AddShipMap = ({ onCreate, onEdit, lat, lng }) => {
  return (
    <MapContainer
      center={[lat || 46.0, lng || 34.0]}
      zoom={5}
      cli
      maxZoom={11}
      minZoom={5}
      style={{
        width: '100%',
        height: '500px'
      }}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url={`${process.env.PUBLIC_URL}/{z}/{x}/{y}.png`}
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FeatureGroup>
        <EditControl
          position="topright"
          onEditMove={(e) => {
            onEdit(e.layer._latlng);
          }}
          onCreated={(e) => {
            onCreate(e.layer._latlng);
          }}
          onDeleted={(e) => console.log('Delete', e)}
          draw={{
            rectangle: false,
            circle: false,
            circlemarker: false,
            marker: { icon },
            polyline: false,
            polygon: false
          }}
        />
        {lat && lng && <Marker position={[lat, lng]} icon={icon}></Marker>}
      </FeatureGroup>
    </MapContainer>
  );
};
