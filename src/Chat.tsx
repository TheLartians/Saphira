import React, { Dispatch, useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import { MessageArgs } from './chatbot-types';
import { getUrlVars, createWebsiteURLWithData } from './urlArgs';
import { useDispatch } from 'react-redux';
import { ChatBotAction } from './state/action';
import { Profile } from './Profile';
import { CodeBlock } from './CodeBlock';

type TriggerProps = { value: string; steps?: any };

export function ProgrammingChatBot() {
  const dispatch = useDispatch<Dispatch<ChatBotAction>>();
  const [height, setHeight] = useState(window.innerHeight);

  React.useEffect(() => {
    function updateHeight() {
      setHeight(window.innerHeight);
    }
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  });

  const steps = [
    {
      id: 'start',
      message: 'Hej, ich bin Saphira 🐉 Wie heißt du? 🤗',
      trigger: 'enter-username',
    },
    {
      id: 'enter-username',
      user: true,
      trigger: 'ask-learn',
    },
    {
      id: 'ask-learn',
      message: (args: MessageArgs) => {
        dispatch({ type: 'setName', value: args.previousValue });
        return `${args.previousValue}, möchtest du lernen, wie man ganz einfach eine Homepage programmiert? 👩💻👨💻`;
      },
      trigger: 'select-learn',
    },
    {
      id: 'select-learn',
      options: [
        { value: 1, label: 'Ja', trigger: 'learn-yes' },
        { value: 2, label: 'Nein', trigger: 'learn-no' },
      ],
    },
    {
      id: 'learn-yes',
      message: 'Super, dann legen wir direkt los! 🤩',
      trigger: 'only-smartphone',
    },
    {
      id: 'learn-no',
      message: 'Schade. Vielleicht kann ich dich dennoch überzeugen 🤔',
      trigger: 'only-smartphone',
    },
    {
      id: 'only-smartphone',
      message: 'Dazu brauchst du nichts weiter als dein Smartphone... 🤳',
      trigger: 'explain-build-together',
      delay: 2000,
    },
    {
      id: 'explain-build-together',
      message:
        'Wir machen das so: Ich zeige dir, wie ich meine Homepage programmiere und du kannst dann in jedem Schritt deine eigene Homepage entwickeln. 🙃💪',
      trigger: 'explain-language-basic',
      delay: 3000,
    },
    {
      id: 'explain-language-basic',
      message:
        'Zuerst erkläre ich dir ganz grob, wie die Sprache funktioniert. ',
      trigger: 'explain-language-basic-tags',
      delay: 1000,
    },
    {
      id: 'explain-language-basic-tags',
      message:
        'Immer, wenn wir was definieren wollen, müssen wir sagen, wo es anfängt und wo es aufhört. Dafür nutzen wir Tags. 🤖',
      trigger: 'explain-language-basic-tags-language',
      delay: 2000,
    },
    {
      id: 'explain-language-basic-tags-language',
      message:
        'Nein, das sind keine Wochentage. Das spricht man aus wie TÄÄG! Das ist sowas wie ein Name. Am Anfang sieht das dann so aus:',
      trigger: 'code-explain-language-basic-tags',
      delay: 2000,
    },
    {
      id: 'code-explain-language-basic-tags',
      trigger: 'ask-tag-input',
      component: <CodeBlock content={`<tag>`} />,
      delay: 1000,
    },
    {
      id: 'ask-tag-input',
      message:
        'Such direkt mal die Zeichen auf deiner Tastatur und tippe <tag> selbst ein :)',
      trigger: 'enter-tag-input',
      delay: 1000,
    },
    {
      id: 'enter-tag-input',
      user: true,
      trigger: (props: TriggerProps) => {
        console.log(props.value);
        if (props.value === '<tag>') {
          return 'enter-tag-input-true';
        } else {
          return 'enter-tag-input-false';
        }
      },
    },
    {
      id: 'enter-tag-input-true',
      message: 'Das klappt ja super!',
      trigger: 'code-explain-language-basic-close-tags',
    },
    {
      id: 'enter-tag-input-false',
      message: 'Das stimmt noch nicht ganz, versuche es nochmal!',
      trigger: 'enter-tag-input',
    },
    {
      id: 'code-explain-language-basic-close-tags',
      message:
        'Am Ende eines Tags müssen wir dann sagen, dass es vorbei ist. 🙅️ Das machen wir so:',
      trigger: 'code-explain-language-basic-close-tags-code',
      delay: 2000,
    },
    {
      id: 'code-explain-language-basic-close-tags-code',
      trigger: 'explain-slash',
      component: <CodeBlock content={`</tag>`} />,
    },
    {
      id: 'explain-slash',
      message:
        'Es ist ganz wichtig, dass wir hier den schrägen Strich nicht vergessen. Dann geht nämlich alles kaputt. 🙇 Gib es jetzt selbst ein.',
      trigger: 'enter-slash',
      delay: 3000,
    },
    {
      id: 'enter-slash',
      user: true,
      trigger: 'only-smartphone',
      validate:
        'Überüfe, ob user ein Slash eingibt; wenn true dann trigger= enter-slash-true; wenn false dann trigger=enter-slash-false ',
      delay: 2000,
    },
    {
      id: 'enter-slash-false',
      message: 'Das stimmt noch nicht ganz, versuche es nochmal',
      trigger: 'enter-slash',
    },
    {
      id: 'enter-slash-true',
      message:
        'Sehr gut! Jetzt haben wir erstmal genug Theorie gehabt, jetzt geht es los! 💪',
      // trigger: "hast-du-lust-loszulegen"
      delay: 1000,
      end: true,
    },
  ];

  const stepsOld = [
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
      trigger: (props: TriggerProps) => {
        dispatch({ type: 'setCode', value: props.value });
        return 'show-code-block';
      },
    },
    {
      id: 'show-code-block',
      asMessage: true,
      component: <CodeBlock content={`<tag>`} />,
      trigger: 'profile',
    },
  ];

  if (height <= 750) {
    return <ChatBot width="100%" steps={steps} floating={true} opened={true} />;
  }

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
          Saphira
        </p>
        <div>
          <ChatBot steps={steps} />
        </div>
        <div style={{ flex: 1 }} />
      </div>
    </div>
  );
}
