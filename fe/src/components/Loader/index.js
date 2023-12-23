import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Spinner from 'react-bootstrap/Spinner';
import './index.scss';
import { shipsDataListLoading } from '../../features/shipsData/store/shipsDataSelectors';
import { useSelector } from 'react-redux';
import { aircraftsLoaderSelector } from '../../features/aircraft/store/aircraftSelectors';

const loaderRoot = document.getElementById('loader');
const app = document.getElementById('root');
const className = 'blur-bg-loading';

export function Loader({ isLocal = false, show = false }) {
  return show ? (
    <div className={isLocal ? 'loader local-loader' : 'loader'}>
      <Spinner animation="grow" />
    </div>
  ) : null;
}

export function LoaderPortal() {
  const shipsData = useSelector(shipsDataListLoading);
  const aircrafts = useSelector(aircraftsLoaderSelector);
  const showLoader =
    Object.values(shipsData).some((bool) => bool) || Object.values(aircrafts).some((bool) => bool);

  useEffect(() => {
    if (showLoader) {
      app.classList.add(className);
    }
    return () => {
      app.classList.remove(className);
    };
  }, [showLoader]);

  return ReactDOM.createPortal(showLoader ? <Loader show={showLoader} /> : null, loaderRoot);
}
