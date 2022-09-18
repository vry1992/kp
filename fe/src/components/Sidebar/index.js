import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { sidebarLinks } from '../../constants/sidebar';
import { routesConfig } from '../../routing';
import { setContentType } from '../../reducers/flowSidebar';
import { contentTypes } from '../../constants/flowSidebar';
import { getUnitNames } from '../../selectors';
import './index.scss';

export function Sidebar() {
  const unitNames = useSelector(getUnitNames);
  const dispatch = useDispatch();
  const location = useLocation();

  const canBeDisabled = [routesConfig.addNewShip.path, routesConfig.shipInfo.path];

  const renderListItems = (link, { type, label, iconPath, clickHandler }) => {
    const isDisabled =
      canBeDisabled.includes(routesConfig[link]?.path) && !Object.keys(unitNames).length;
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
              dispatch(setContentType(contentTypes.peleng));
            }}>
            <img src={iconPath} alt={label} />
            <span>{label}</span>
          </div>
        )}
      </ListGroup.Item>
    );
  };

  return (
    <div className="sidebar">
      <ListGroup as="ul">
        {Object.entries(sidebarLinks).map((link) => renderListItems(...link))}
      </ListGroup>
    </div>
  );
}
