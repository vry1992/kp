import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import { isLoading } from '../../selectors';
import './index.scss';

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
  const showLoader = useSelector(isLoading);

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
