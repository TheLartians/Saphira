import React from 'react';
import { useSelector } from 'react-redux';
import { ChatBotState } from './state';
import { codeFromState } from './state/code';

export function WebsitePreview() {
  const code = useSelector<ChatBotState, string>((state) =>
    codeFromState(state.code)
  );
  return (
    <div dangerouslySetInnerHTML={{ __html: code.replace('body', 'div') }} />
  );
}
