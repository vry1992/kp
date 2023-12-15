import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Headline } from '../../components/Headline';
import { InteractiveMap } from '../../components/InteractiveMap';
import { DUTY_INFO_STORAGE_KEY } from '../DutyInfo';
import './style.scss';
import { getRanksOptions } from '../../constants/dutyInfoForm';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { SEARCH_KEY } from '../../constants/searchForm';
import { format } from 'date-fns';

function DropDown({ onSelect, settings }) {
  return (
    <DropdownButton
      id="dropdown-basic-button"
      title="Налаштування"
      size="sm"
      variant="secondary"
      style={{ position: 'absolute', bottom: '0px', right: 0, zIndex: 90000 }}>
      <Dropdown.Item onClick={() => onSelect('showLast')}>
        {settings.showLast ? 'Показати всі записи' : 'Показати унікальні записи'}
      </Dropdown.Item>
    </DropdownButton>
  );
}

const getDateOfFilters = (filters, dutyInfo) => {
  if (filters) {
    const { dateTo, dateFrom } = filters;
    const from = format(new Date(dateFrom), 'dd.MM.yyyy, HH:mm');
    const to = format(new Date(dateTo), 'dd.MM.yyyy, HH:mm');
    return { from, to };
  } else if (!filters && dutyInfo) {
    const from = format(new Date(dutyInfo.dutyStartDate).setHours(9), 'dd.MM.yyyy, HH:mm');
    const to = format(new Date(), 'dd.MM.yyyy, HH:mm');
    return { from, to };
  }
  return {
    from: format(new Date(), 'dd.MM.yyyy, HH:mm'),
    to: format(new Date(), 'dd.MM.yyyy, HH:mm')
  };
};
export function Map() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sign, setSign] = useState(null);
  const [settings, setSettings] = useState({
    showLast: false
  });
  const [initFilters, setInitFilters] = useState(null);

  if (location.state?.update) {
    localStorage.setItem('SETTINGS', JSON.stringify(settings));
    window.location.reload();
    const sets = localStorage.getItem('SETTINGS');
    if (sets) {
      setSettings(sets);
    }
  }

  useEffect(() => {
    const storageData = localStorage.getItem(DUTY_INFO_STORAGE_KEY);
    const dutyData = storageData ? JSON.parse(storageData) : null;
    setSign(dutyData);
  }, []);

  useEffect(() => {
    const filters = localStorage.getItem(SEARCH_KEY);
    if (filters) {
      setInitFilters(JSON.parse(filters));
    }
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
        <Headline
          text={`${getDateOfFilters(initFilters, sign).from} - ${
            getDateOfFilters(initFilters, sign).to
          }`}
          tagName={'b'}
          style={{ display: 'block', fontSize: '20px', cursor: 'pointer' }}
          onClick={() => navigate('/search')}
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
        settings={settings}
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
