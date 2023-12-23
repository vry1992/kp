import React from 'react';
import { AddNewShip } from '../pages/AddNewShip';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { AddNewUnit } from '../pages/AddNewUnit';
import { Map } from '../pages/Map';
import { SuccessAddedShip } from '../pages/SuccessAddedShip';
import { SuccessAddedUnit } from '../pages/SuccessAddedUnit';
import { ShipInfo } from '../pages/ShipInfo';
import { EditShipInfo } from '../pages/EditShipInfo';
import { DutyInfo } from '../pages/DutyInfo';
import { AircraftInfo } from '../pages/AircraftInfo';
import { EditAircraftInfo } from '../pages/EditAircraftInfo';

export const routesConfig = {
  addNewShip: {
    path: '/new-ship',
    page: AddNewShip
  },
  addNewUnit: {
    path: '/new-unit',
    page: AddNewUnit
  },
  map: {
    path: '/map',
    page: Map
  },
  shipInfo: {
    path: '/ship-info',
    page: ShipInfo
  },
  editShipInfo: {
    path: '/ship-info/edit/:id',
    page: EditShipInfo
  },
  editAircraftInfo: {
    path: '/aircraft-info/edit/:id',
    page: EditAircraftInfo
  },
  successAddedShip: {
    path: '/success-added-ship',
    page: SuccessAddedShip
  },
  successAddedunit: {
    path: '/success-added-unit',
    page: SuccessAddedUnit
  },
  dutyInfo: {
    path: '/duty-info',
    page: DutyInfo
  },
  aircraftInfo: {
    path: '/aircraft',
    page: AircraftInfo
  }
};

const getLayout = ({ route }) => {
  const { page } = routesConfig[route];
  return <Layout page={page} />;
};

export function Routing() {
  return (
    <Routes>
      {Object.keys(routesConfig).map((route) => {
        return (
          <Route key={route} path={routesConfig[route].path} element={getLayout({ route })}></Route>
        );
      })}
      <Route path="*" element={<Navigate to={routesConfig.addNewShip.path} />} />
    </Routes>
  );
}
