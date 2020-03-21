export type ChatBotAction =
  | {
      type: 'setName';
      value: string;
    }
  | {
      type: 'setAge';
      value: number;
    }
  | {
      type: 'setURL';
      value: string;
    };
