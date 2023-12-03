import React from 'react';

export function Headline({ tagName: TagName = 'h1', text, style = {} }) {
  return <TagName style={style}>{text}</TagName>;
}
