import React from 'react';
import Button from 'react-bootstrap/Button';
import './index.scss';

export function CustomButton({
  text,
  variant = 'primary',
  disabled,
  onClick,
  iconPath,
  type = 'button',
  size = 'sm',
  style = {}
}) {
  return (
    <Button
      className="custom-button"
      variant={variant}
      onClick={onClick}
      disabled={disabled}
      type={type}
      size={size}
      style={style}>
      {text}
      {iconPath && <img src={iconPath} alt={text} />}
    </Button>
  );
}
