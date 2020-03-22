import { ChatBotAction } from './action';

const defaultState = {
  body: undefined as undefined | string,
  title: undefined as undefined | string,
  titleColor: undefined as undefined | string,
};

export function codeFromState(state: typeof defaultState) {
  let current = '';
  if (state.title) {
    current = `<h1${
      state.titleColor ? ` style="color:${state.titleColor};"` : ''
    }>${state.title}</h1>`;
  }
  if (state.body) {
    current = `${current}\n${state.body}`;
  }
  return `<body>\n${current}</body>`;
}

export function codeReducer(state = defaultState, action: ChatBotAction) {
  switch (action.type) {
    case 'setBody':
      state = { ...state, body: action.value };
      break;
    case 'setTitle':
      state = { ...state, title: action.value };
      break;
    case 'setTitleColor':
      state = { ...state, titleColor: action.value };
      break;
  }
  return state;
}
