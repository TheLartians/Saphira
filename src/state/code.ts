import { ChatBotAction } from './action';

const defaultProfileState = undefined as undefined | string;

export function codeReducer(
  state = defaultProfileState,
  action: ChatBotAction
) {
  switch (action.type) {
    case 'setCode':
      state = action.value;
      break;
  }
  return state || null;
}
