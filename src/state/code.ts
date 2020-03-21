import { ChatBotAction } from './action';

const defaultProfileState = {
  code: undefined as undefined | string,
};

export function codeReducer(
  state = defaultProfileState,
  action: ChatBotAction
) {
  switch (action.type) {
    case 'setCode':
      state = { ...state, code: action.value };
      break;
  }
  return state;
}
