import { combineReducers } from 'redux';
import { profileReducer } from './profile';

export const chatBotReducer = combineReducers({
  profile: profileReducer,
});

export type ChatBotState = NonNullable<Parameters<typeof chatBotReducer>[0]>;
