import React from 'react';

export function Headline({ tagName: TagName = 'h1', text }) {
  return <TagName>{text}</TagName>;
}
