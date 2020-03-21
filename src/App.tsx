import React from 'react';
import logo from './logo.svg';
import './App.css';
import ChatBot from "react-simple-chatbot";

const steps = [
  {
    id: "1",
    message: "What is your name?",
    trigger: "2",
  },
  {
    id: "2",
    trigger: "3",
    user: true,
  },
  {
    end: true,
    id: "3",
    message: "Hi {previousValue}, nice to meet you!",
  },
];

function App() {
  return (
    <div style={{backgroundColor: "gray", width: "100%", minHeight: "100vh", display: "flex", flexDirection: "column"}}>
      <div style={{display: "flex", flex: 1, flexDirection: "column", justifyContent: "center", alignSelf: "center"}}>
        <div style={{flex: 1}}/>
        <p style={{textAlign: "center", fontWeight: "bold", color: "white", fontSize: 25}}>
          Chatbot test
        </p>
        <div>
        <ChatBot steps={steps} />
        </div>
        <div style={{flex: 1}}/>
      </div>
    </div>
  );
}

export default App;
