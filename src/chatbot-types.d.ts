export type Step = any;

export interface MessageArgs {
  previousValue: string;
  steps: Step[];
}

export interface TriggerArgs {
  value: string;
  steps: Step[];
}
