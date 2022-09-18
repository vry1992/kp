import React from 'react';
import { CustomButton } from '../CustomButton';
import { Modal } from '../Modal';
import { Paragraph } from '../Paragraph';

export function RefuseAddNewShipModal({
  show,
  onClick,
  text = 'Спочатку потрібно додати хоча б один підрозділ',
  buttonText = 'Додати підрозділи'
}) {
  return (
    <Modal show={show}>
      <Paragraph text={text} />
      <CustomButton onClick={onClick} text={buttonText} />
    </Modal>
  );
}
