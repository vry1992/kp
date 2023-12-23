import React from 'react';
import { MapContainer, TileLayer, LayersControl, LayerGroup } from 'react-leaflet';
import { ShipsLayer } from '../Layers/ships';
import './index.scss';
import { AircraftLayer } from '../Layers/aircrafts';

export const InteractiveMap = ({ settings }) => {
  return (
    <MapContainer center={[44.2976268, 31.7484256]} zoom={5} cli maxZoom={11} minZoom={5}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url={`${process.env.PUBLIC_URL}/{z}/{x}/{y}.png`}
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LayersControl position="topright">
        <LayersControl.Overlay checked name="Кораблі">
          <LayerGroup>
            <ShipsLayer settings={settings} />
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay checked name="Літаки">
          <LayerGroup>
            <AircraftLayer settings={settings} />
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
};
