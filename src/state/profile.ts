import { ChatBotAction } from './action';

const defaultProfileState = {
  name: undefined as undefined | string,
  age: undefined as undefined | number,
  url: undefined as undefined | string,
};

export function profileReducer(
  state = defaultProfileState,
  action: ChatBotAction
) {
  switch (action.type) {
    case 'setAge':
      state = { ...state, age: action.value };
      break;
    case 'setName':
      state = { ...state, name: action.value };
      break;
    case 'setURL':
      state = { ...state, url: action.value };
      break;
  }
  return state;
}
