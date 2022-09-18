import React from 'react';
import { useSelector } from 'react-redux';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { getPelengsToDraw } from '../../selectors';
import './index.scss';
import { CustomButton } from '../CustomButton';

export function PelengsList() {
  const pelengs = useSelector(getPelengsToDraw);

  return (
    <ToastContainer className="p-3">
      {pelengs.map((peleng) => {
        return (
          <Toast key={peleng.id}>
            <Toast.Header closeButton={false}>
              <div className="peleng-color" style={{ borderColor: peleng.color }}></div>
              <strong className="me-auto" style={{ color: peleng.color }}>
                {peleng.peleng}
                <sup>o</sup>
              </strong>
              <CustomButton iconPath={`${process.env.PUBLIC_URL}/images/icons/delete.png`} />
            </Toast.Header>
            <Toast.Body>
              <strong>Координати точки відліку:</strong>
              <p>
                Ш. <i>(квадратичні координати)</i>: {peleng.lat.toFixed(8)}
              </p>
              <p>
                Д. <i>(квадратичні координати)</i>: {peleng.lng.toFixed(8)}
              </p>
            </Toast.Body>
          </Toast>
        );
      })}
    </ToastContainer>
  );
}
