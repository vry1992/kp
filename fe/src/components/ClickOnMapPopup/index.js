import React from 'react';
import { Modal } from '../Modal';
import { Paragraph } from '../Paragraph';
import { CustomButton } from '../CustomButton';

export const ClickOnMapPopup = ({ show, onConfirm, onCancel }) => {
  return (
    <Modal show={show}>
      <Paragraph text={'Додати новий обʼєкт в цій точці?'} />
      <CustomButton onClick={onConfirm} text="Так" />
      <CustomButton onClick={onCancel} text="Відмінити" />
    </Modal>
  );
};
