import React from 'react';
import { Paragraph } from '../Paragraph';
import './index.scss';

export function MandatoryFieldsNotification() {
  return (
    <Paragraph className="mandatory-label" text={`Поля помічені * - обов'язкові для заповнення`} />
  );
}
