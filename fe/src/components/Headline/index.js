import React from 'react';

export function Headline({ tagName: TagName = 'h1', text, style = {}, onClick = () => {} }) {
  return (
    <TagName style={style} onClick={onClick}>
      {text}
    </TagName>
  );
}
