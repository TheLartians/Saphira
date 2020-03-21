import React from 'react';
import './App.css';
import { ProgrammingChatBot } from './ProgrammingChatbot';
import { getUrlVars } from './urlArgs';
import { createStore } from 'redux';
import { chatBotReducer } from './state';
import { Provider } from 'react-redux';

function App() {
  // display custom site if site argument passed to url
  const args = getUrlVars();
  if (args['site']) {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: args['site'],
        }}
      />
    );
  }

  const store = createStore(chatBotReducer);

  return (
    <Provider store={store}>
      <ProgrammingChatBot />
    </Provider>
  );
}

export default App;
