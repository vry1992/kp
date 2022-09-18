import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { parseDate } from '../../helpers';

export const CustomPopover = ({ children, ...rest }) => (
  <OverlayTrigger
    trigger="hover"
    placement="right"
    overlay={
      <Popover id="popover-basic">
        <Popover.Header as="h3">
          Зафіксовано: <strong>{parseDate(+rest.discoverTimestamp)}</strong>
        </Popover.Header>
        <Popover.Body>
          {rest.shipType} пр.{rest.shipProject} {rest.shipName}{' '}
        </Popover.Body>
      </Popover>
    }>
    {children}
  </OverlayTrigger>
);
