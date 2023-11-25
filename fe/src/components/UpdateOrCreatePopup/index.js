import React from 'react';
import { Modal } from '../Modal';
import { Paragraph } from '../Paragraph';
import { CustomButton } from '../CustomButton';

export const UpdateOrCreateNewPopup = ({ show, onMoveCurrentPress, onCancel }) => {
  return (
    <Modal show={show}>
      <Paragraph text={'Додати новий обʼєкт, чи перемісити поточний?'} />
      <CustomButton onClick={() => {}} text="Створити новий" />
      <CustomButton onClick={onMoveCurrentPress} text="Перемістити поточний" />
      <CustomButton onClick={onCancel} text="Відмінити" />
    </Modal>
  );
};
