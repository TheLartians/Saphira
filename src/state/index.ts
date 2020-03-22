import { combineReducers } from 'redux';
import { profileReducer } from './profile';
import { codeReducer } from './code';

export const chatBotReducer = combineReducers({
  profile: profileReducer,
  code: codeReducer,
});

export type ChatBotState = NonNullable<Parameters<typeof chatBotReducer>[0]>;
