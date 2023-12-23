import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { sidebarLinks } from '../../constants/sidebar';
import { routesConfig } from '../../routing';
import './index.scss';
import { UnitServices } from '../../features/units/services/UnitServices';
import { SearchForm } from '../SearchForm';

export function Sidebar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [unitsList, setUnitsList] = useState([]);

  const canBeDisabled = [routesConfig.addNewShip.path, routesConfig.shipInfo.path];

  const renderListItems = (link, { type, label, iconPath, clickHandler }) => {
    const isDisabled = canBeDisabled.includes(routesConfig[link]?.path) && !unitsList.length;

    return (
      <ListGroup.Item
        as="li"
        key={link}
        onClick={clickHandler}
        active={location.pathname === routesConfig[link]?.path}
        disabled={isDisabled}>
        {type === 'navigation' && <Link to={routesConfig[link].path}>{label}</Link>}
        {type === 'flowSidebarOpener' && (
          <div
            onClick={() => {
              dispatch(clickHandler());
            }}>
            <img src={iconPath} alt={label} />
            <span>{label}</span>
          </div>
        )}
      </ListGroup.Item>
    );
  };

  useEffect(() => {
    const getUnits = async () => {
      const units = await UnitServices.getUnits();
      setUnitsList(units);
    };
    getUnits();
  }, []);

  return (
    <div className="sidebar">
      <ListGroup as="ul">
        {Object.entries(sidebarLinks).map((link) => renderListItems(...link))}
      </ListGroup>
      <br />
      <br />
      {location.pathname === '/map' && <SearchForm />}
    </div>
  );
}
