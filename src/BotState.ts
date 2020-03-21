import { useState } from "react";

export interface ChatBotState {
  name?: string;
  url?: string;
  age?: number;
}

export function useChatBotState() {
  const [state, rawSetState] = useState<ChatBotState>({});

  /**
   * Chatbot has no internal state, so we need to create our own and 
   * keep the captured object up-to-date.
   */
  const setState = (newState: ChatBotState) => {
    rawSetState(newState);
    // set new values
    for (const key in newState) {
      state[key as keyof ChatBotState] = newState[key as keyof ChatBotState] as any;
    }
    // unset deleted values
    for (const key in state) {
      if (!(key in newState)) {
        state[key as keyof ChatBotState] = undefined;
      }
    }
  };

  return [state, setState] as const;
}
