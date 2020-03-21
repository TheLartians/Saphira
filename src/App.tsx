import React, { useState } from 'react';
import './App.css';
import ChatBot from "react-simple-chatbot";
import { MessageArgs } from './chatbot-types';
import Editor from 'react-simple-code-editor';

function Profile(props: {name?: string, age?: number}) {
  return <p style={{color: "white"}}>
    <b>Name:</b> {props.name || "Unbekannt"} <br/>
    <b>Alter:</b> {props.age || "Unbekannt"} 
  </p>
}

function App() {

  const [name, setName] = useState<string | undefined>();
  const [age, setAge] = useState<number | undefined>();

  const steps = [
    {
      id: "start",
      message: `Moin, was möchtest du machen?`,
      trigger: "2",
    },
    {
      id: "2",
      options: [
        { value: 1, label: 'Namen ändern', trigger: 'update-name' },
        { value: 2, label: 'Alter angeben', trigger: 'update-age' },
        { value: 3, label: 'Programmieren', trigger: 'code-start' },
      ],
    },
    {
      id: "update-name",
      message: "Okay, wie heißt du?",
      trigger: "enter-name"
    },
    {
      id: "enter-name",
      user: true,
      trigger: "set-name"
    },
    {
      id: 'set-name',
      message: (args: MessageArgs) => {
        setName(args.previousValue);
        return `Moin ${args.previousValue}!`
      } ,
      trigger: "start",
    },
    {
      id: "update-age",
      message: "Wie alt bist du?",
      trigger: "enter-age",
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
        setAge(parseInt(args.previousValue));
        return `Du bist also ${parseInt(args.previousValue)}.`
      } ,
      trigger: "start",
    },
    {
      id: 'code-start',
      message: "Ok, dann schreibe mal eine JavaScript funktion die zwei Zahlen addiert.",
      trigger: "enter-code"
    },
    {
      id: 'enter-code',
      trigger: "finish-code",
      user: true,
      validator: (input: string) => { 
        try {
          const a = Math.random(), b=Math.random();
          if (eval(input)(a,b) === a+b) {
            return true;
          } else {
            return "Das hat leider nicht geklappt. :("
          }
        } catch (error) {
          return error;
        }
      }
    },
    {
      id: "finish-code",
      message: "Herzlichen Glückwunsch! Du bist jetzt ein Programmierer!",
      trigger: "start"
    }
  ];
  
  return (
    <div style={{backgroundColor: "gray", width: "100%", minHeight: "100vh", display: "flex", flexDirection: "column"}}>
      <div style={{display: "flex", flex: 1, flexDirection: "column", justifyContent: "center", alignSelf: "center"}}>
        <div style={{flex: 1}}/>
        <p style={{textAlign: "center", fontWeight: "bold", color: "white", fontSize: 25}}>
          Chatbot test
        </p>
        <div>
          <ChatBot steps={steps} />
          <Profile name={name} age={age} />
        </div>
        <div style={{flex: 1}}/>
      </div>
    </div>
  );
}

export default App;
