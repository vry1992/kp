import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

const modalRoot = document.getElementById('modal');
const app = document.getElementById('root');
const className = 'blur-bg-modal';

const ModalLayout = ({ content, isError }) => {
  return (
    <div className="modal-wrapper">
      <div className={`modal-content ${isError ? 'error-modal' : ''}`}>{content}</div>
    </div>
  );
};

export function Modal({ show, isError = false, children }) {
  useEffect(() => {
    show && app.classList.add(className);
    return () => {
      app.classList.remove(className);
    };
  }, [show]);

  return ReactDOM.createPortal(
    show ? <ModalLayout content={children} isError={isError} /> : null,
    modalRoot
  );
}
