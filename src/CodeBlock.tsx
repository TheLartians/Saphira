import React from 'react';
import { useSelector } from 'react-redux';
import { ChatBotState } from './state';
import { codeFromState } from './state/code';

/**
 * If content is provided, display content. Otherwise display the code stored
 * in the redux store
 */
export const CodeBlock = (props: { content?: string }) => {
  const savedCode = useSelector<ChatBotState>((state: ChatBotState) =>
    codeFromState(state.code)
  );
  const code = props.content || savedCode;

  return (
    <div
      style={{
        fontFamily:
          'Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace',
        backgroundColor: '#4d0000',
        color: 'white',
        padding: 10,
        borderRadius: 5,
      }}
    >
      <HeaderBar />
      {code || `<NO CODE>`}
    </div>
  );
};

const Circle = (props: { color: string }) => (
  <div
    style={{
      width: 10,
      height: 10,
      backgroundColor: props.color,
      borderRadius: 50,
      marginRight: 5,
    }}
  />
);

const HeaderBar = () => (
  <>
    <div
      style={{
        paddingBottom: 10,
        display: 'flex',
        justifyContent: 'flex-start',
      }}
    >
      <Circle color="red" />
      <Circle color="yellow" />
      <Circle color="lightgreen" />
    </div>
    <div
      style={{
        borderBottom: '0.5px solid grey',
        marginBottom: 10,
      }}
    ></div>
  </>
);
