import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Headline } from '../../components/Headline';
import { InteractiveMap } from '../../components/InteractiveMap';
import { DUTY_INFO_STORAGE_KEY } from '../DutyInfo';
import './style.scss';
import { getRanksOptions } from '../../constants/dutyInfoForm';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function DropDown({ onSelect }) {
  return (
    <DropdownButton
      id="dropdown-basic-button"
      title="Налаштування"
      size="sm"
      variant="secondary"
      style={{ position: 'absolute', bottom: '0px', right: 0, zIndex: 90000 }}>
      <Dropdown.Item onClick={() => onSelect('showLast')}>
        Показати чи приховати останні
      </Dropdown.Item>
    </DropdownButton>
  );
}
export function Map() {
  const location = useLocation();
  const [sign, setSign] = useState(null);
  const [settings, setSettings] = useState({
    showLast: false
  });

  useEffect(() => {
    const storageData = localStorage.getItem(DUTY_INFO_STORAGE_KEY);
    const dutyData = storageData ? JSON.parse(storageData) : null;
    setSign(dutyData);
  }, []);

  const mapData = location.state || [];

  return (
    <div className="map">
      <div className="map_title">
        <Headline
          text="РОБОЧА КАРТА"
          tagName={'b'}
          style={{ display: 'block', fontSize: '24px' }}
        />
        <Headline
          text="чергового командного пункту загону РЕР військової частини А1892"
          tagName={'b'}
          style={{ display: 'block', fontSize: '20px' }}
        />
      </div>

      <DropDown
        onSelect={(key) => {
          setSettings((prev) => {
            return {
              ...prev,
              [key]: !prev[key]
            };
          });
        }}
      />

      <InteractiveMap
        width={window.innerWidth * 0.8}
        height={window.innerHeight * 0.5}
        data={mapData}
        settings={settings}
      />
      {sign ? (
        <div className="map_footer">
          <Headline
            text="Черговий командного пункту загону РЕР військової частини А1892"
            tagName={'b'}
            style={{ display: 'block', fontSize: '18px' }}
          />
          <div className="d-flex signiture">
            <Headline
              text={getRanksOptions().find(({ key }) => key === sign.dutyManRank)?.label}
              tagName={'b'}
              style={{ display: 'block', fontSize: '18px' }}
            />
            <div style={{ width: '37%' }}></div>
            <Headline
              text={sign?.dutyManFullName}
              tagName={'b'}
              style={{ display: 'block', fontSize: '18px' }}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
