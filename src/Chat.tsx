import React, { Dispatch } from 'react';
import ChatBot from 'react-simple-chatbot';
import { MessageArgs } from './chatbot-types';
import { getUrlVars, createWebsiteURLWithData } from './urlArgs';
import { useDispatch } from 'react-redux';
import { ChatBotAction } from './state/action';
import { Profile } from './Profile';
import { CodeBlock } from './CodeBlock';

export function ProgrammingChatBot() {
  const dispatch = useDispatch<Dispatch<ChatBotAction>>();

  const steps = [
    {
      id: 'start',
      message: `Moin, was möchtest du machen?`,
      trigger: 'select',
    },
    {
      id: 'profile',
      component: <Profile />,
      trigger: 'start',
    },
    {
      id: 'select',
      options: [
        { value: 1, label: 'Namen ändern', trigger: 'update-name' },
        { value: 2, label: 'Alter angeben', trigger: 'update-age' },
        { value: 3, label: 'Programmieren', trigger: 'code-start' },
        { value: 4, label: 'Website erstellen', trigger: 'create-website' },
        { value: 5, label: 'Mein Profil', trigger: 'profile' },
        { value: 6, label: 'Code eingeben', trigger: 'update-code' },
      ],
    },
    {
      id: 'update-name',
      message: 'Okay, wie heißt du?',
      trigger: 'enter-name',
    },
    {
      id: 'enter-name',
      user: true,
      trigger: 'set-name',
    },
    {
      id: 'set-name',
      message: (args: MessageArgs) => {
        dispatch({ type: 'setName', value: args.previousValue });
        return `Moin ${args.previousValue}!`;
      },
      trigger: 'start',
    },
    {
      id: 'update-age',
      message: 'Wie alt bist du?',
      trigger: 'enter-age',
    },
    {
      id: 'enter-age',
      user: true,
      validator: (input: string) => {
        const value = parseInt(input);
        if (isNaN(value)) {
          return 'Bitte gib eine Zahl ein.';
        } else if (value < 10 || value >= 100) {
          return `${value}? Komm schon.`;
        }
        return true;
      },
      trigger: 'set-age',
    },
    {
      id: 'set-age',
      message: (args: MessageArgs) => {
        dispatch({ type: 'setAge', value: parseInt(args.previousValue) });
        return `Du bist also ${parseInt(args.previousValue)}.`;
      },
      trigger: 'start',
    },
    {
      id: 'code-start',
      message:
        'Ok, dann schreibe mal eine JavaScript funktion die zwei Zahlen addiert.',
      trigger: 'enter-code',
    },
    {
      id: 'enter-code',
      trigger: 'finish-code',
      user: true,
      validator: (input: string) => {
        try {
          const a = Math.random(),
            b = Math.random();
          if (eval(input)(a, b) === a + b) {
            return true;
          } else {
            return 'Das hat leider nicht geklappt. :(';
          }
        } catch (error) {
          return error;
        }
      },
    },
    {
      id: 'finish-code',
      message: 'Herzlichen Glückwunsch! Du bist jetzt ein Programmierer!',
      trigger: 'start',
    },
    {
      id: 'create-website',
      message: 'Cool! Dann gib mal deinen HTML code ein.',
      trigger: 'enter-website',
    },
    {
      id: 'enter-website',
      trigger: 'finish-website',
      user: true,
    },
    {
      id: 'finish-website',
      message: (args: MessageArgs) => {
        dispatch({
          type: 'setURL',
          value: createWebsiteURLWithData('site', args.previousValue),
        });
        return 'Super! Deine Website ist jetzt im Link unten!';
      },
      trigger: 'profile',
    },
    {
      id: 'update-code',
      message: 'Bitte schreibe etwas code',
      trigger: 'enter-code',
    },
    {
      id: 'enter-code',
      user: true,
      trigger: 'set-code',
    },
    {
      id: 'set-code',
      message: (args: MessageArgs) => {
        dispatch({ type: 'setCode', value: args.previousValue });
        return `Code saved!`;
      },
      trigger: 'show-code-block',
    },
    {
      id: 'show-code-block',
      asMessage: true,
      component: <CodeBlock  />,
      trigger: 'profile',
    },
  ];
  // `Hier ist deine Website: ${createWebsiteURLWithData("site",args.previousValue)}`
  return (
    <div
      style={{
        backgroundColor: 'gray',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignSelf: 'center',
        }}
      >
        <div style={{ flex: 1 }} />
        <p
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: 'white',
            fontSize: 25,
          }}
        >
          Code-Dragon
        </p>
        <div>
          <ChatBot steps={steps} />
        </div>
        <div style={{ flex: 1 }} />
      </div>
    </div>
  );
}
