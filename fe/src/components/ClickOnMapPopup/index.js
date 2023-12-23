import React from 'react';
import { Modal } from '../Modal';
import { Paragraph } from '../Paragraph';
import { CustomButton } from '../CustomButton';

export const ClickOnMapPopup = ({ show, onConfirmPlane, onConfirmShip, onCancel }) => {
  return (
    <Modal show={show}>
      <Paragraph text={'Додати новий обʼєкт в цій точці?'} />
      {onConfirmPlane && <CustomButton onClick={onConfirmPlane} text="Літак" />}
      {onConfirmShip && <CustomButton onClick={onConfirmShip} text="Корабель" />}
      <CustomButton onClick={onCancel} text="Відмінити" />
    </Modal>
  );
};
