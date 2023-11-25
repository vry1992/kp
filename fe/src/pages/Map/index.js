import React from 'react';
import { useLocation } from 'react-router-dom';
import { Headline } from '../../components/Headline';
import { InteractiveMap } from '../../components/InteractiveMap';
import './style.scss';

export function Map() {
  const location = useLocation();

  const mapData = location.state || [];

  return (
    <div className="map">
      <div className="map_title">
        <Headline text="РОБОЧА КАРТА" tagName={'h3'} />
        <Headline text="чергового загону РЕР військової частини А1892" tagName={'h4'} />
      </div>

      <InteractiveMap
        width={window.innerWidth * 0.8}
        height={window.innerHeight * 0.85}
        data={mapData}
      />
    </div>
  );
}
