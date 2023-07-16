import React from 'react';
import { AddNewShip } from '../pages/AddNewShip';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { AddNewUnit } from '../pages/AddNewUnit';
import { Map } from '../pages/Map';
import { Search } from '../pages/Search';
import { SuccessAddedShip } from '../pages/SuccessAddedShip';
import { SuccessAddedUnit } from '../pages/SuccessAddedUnit';
import { ShipInfo } from '../pages/ShipInfo';
import { EditShipInfo } from '../pages/EditShipInfo';

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
  search: {
    path: '/search',
    page: Search
  },
  successAddedShip: {
    path: '/success-added-ship',
    page: SuccessAddedShip
  },
  successAddedunit: {
    path: '/success-added-unit',
    page: SuccessAddedUnit
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
