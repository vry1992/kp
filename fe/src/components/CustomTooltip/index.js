import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export const CustomTooltip = ({ placement = 'top', children, text }) => {
  return (
    <OverlayTrigger
      key={placement}
      placement={placement}
      overlay={<Tooltip id={`tooltip-${placement}`}>{text}</Tooltip>}>
      {children}
    </OverlayTrigger>
  );
};
