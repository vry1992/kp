import React from 'react';
import { useLocation } from 'react-router-dom';
import { Headline } from '../../components/Headline';
import { InteractiveMap } from '../../components/InteractiveMap';

export function Map() {
  const location = useLocation();

  const mapData = location.state || [];

  return (
    <div className="map">
      <Headline text="Інтерактивна карта" />
      <InteractiveMap
        width={window.innerWidth * 0.8}
        height={window.innerHeight * 0.85}
        data={mapData}
      />
    </div>
  );
}
