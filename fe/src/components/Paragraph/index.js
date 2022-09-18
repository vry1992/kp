import React from 'react';

export function Paragraph({ text = '', className = '' }) {
  return <p className={className}>{text}</p>;
}
