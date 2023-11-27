import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Headline } from '../../components/Headline';
import { InteractiveMap } from '../../components/InteractiveMap';
import { DUTY_INFO_STORAGE_KEY } from '../DutyInfo';
import './style.scss';
import { getRanksOptions } from '../../constants/dutyInfoForm';

export function Map() {
  const location = useLocation();
  const [sign, setSign] = useState(null);

  useEffect(() => {
    const storageData = localStorage.getItem(DUTY_INFO_STORAGE_KEY);
    const dutyData = storageData ? JSON.parse(storageData) : null;
    setSign(dutyData);
  }, []);

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
      {sign ? (
        <div className="map_footer">
          <Headline
            text="Черговий командного пункту загону РЕР військової частини А1892"
            tagName={'h5'}
          />
          <div className="d-flex signiture">
            <Headline
              text={getRanksOptions().find(({ key }) => key === sign.dutyManRank)?.label}
              tagName={'h5'}
            />
            <div style={{ width: '37%' }}></div>
            <Headline text={sign?.dutyManFullName} tagName={'h5'} />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}