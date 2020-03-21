import React from 'react';
import { useSelector } from 'react-redux';
import { ChatBotState } from './state';

export function Profile() {
  const name = useSelector<ChatBotState>((state) => state.profile.name);
  const age = useSelector<ChatBotState>((state) => state.profile.age);
  const url = useSelector<ChatBotState>((state) => state.profile.url);
  return (
    <p style={{ color: 'black' }}>
      <b>Name:</b> {name || 'Unbekannt'} <br />
      <b>Alter:</b> {age || 'Unbekannt'} <br />
      <b>Deine seite:</b> {url ? <a href={url as string}>link</a> : 'Keine'}
    </p>
  );
}
