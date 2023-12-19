import React from 'react';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

export const AddAircraftMap = ({ onCreate }) => {
  return (
    <MapContainer
      center={[46.0, 34.0]}
      zoom={7}
      cli
      maxZoom={11}
      minZoom={5}
      style={{
        width: '100%',
        height: '700px'
      }}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url={`${process.env.PUBLIC_URL}/{z}/{x}/{y}.png`}
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FeatureGroup>
        <EditControl
          position="topright"
          onEdited={(e) => console.log('EDIT', e)}
          onCreated={(e) => onCreate(e.layer.editing.latlngs[0])}
          onDeleted={(e) => console.log('Delete', e)}
          draw={{
            rectangle: false,
            circle: false,
            circlemarker: false,
            marker: true,
            polyline: {
              shapeOptions: {
                color: 'red',
                stroke: true,
                fill: false,
                dashArray: [10, 20],
                dashOffset: 10,
                opacity: 1
              }
            },
            polygon: {
              showArea: false,
              shapeOptions: {
                color: 'red',
                stroke: true,
                fill: false,
                dashArray: [10, 20],
                dashOffset: 10,
                opacity: 1
              }
            }
          }}
        />
      </FeatureGroup>
    </MapContainer>
  );
};
