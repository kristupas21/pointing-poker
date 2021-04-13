import en from './en';
import lt from './lt';

export type MessageId = keyof typeof en;

export type LocaleKey = keyof typeof MESSAGES;

export const MESSAGES = {
  en,
  lt
};
