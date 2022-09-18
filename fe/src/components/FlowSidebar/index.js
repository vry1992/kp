import React, { useCallback, useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPelengationPanelState } from '../../reducers/peleng';
import { getFlowSidebarContentType, getIsPelengationPanelReady } from '../../selectors';
import { contentTypes } from '../../constants/flowSidebar';
import { routesConfig } from '../../routing';
import { setContentType } from '../../reducers/flowSidebar';
import { PelengForm } from '../PelengForm';
import { PelengsList } from '../PelengsList';

export function FlowSidebar({ title = 'Пеленг' }) {
  const contentType = useSelector(getFlowSidebarContentType);
  const isPelengationPanelReady = useSelector(getIsPelengationPanelReady);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const renderContent = useCallback(() => {
    const config = {
      [contentTypes.peleng]: <PelengForm />
    };
    return config[contentType];
  }, [contentType]);

  const hideHalndler = (type) => {
    switch (type) {
      case contentTypes.peleng:
        return () => {
          dispatch(setPelengationPanelState());
          dispatch(setContentType(null));
        };
      default:
        return () => {};
    }
  };

  useEffect(() => {
    if (contentType === contentTypes.peleng) {
      navigate(routesConfig.map.path);
    }
  }, [contentType, navigate]);

  return (
    <Offcanvas show={isPelengationPanelReady} onHide={hideHalndler(contentType)} backdrop={false}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{title}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <PelengsList />
        {renderContent()}
      </Offcanvas.Body>
    </Offcanvas>
  );
}
