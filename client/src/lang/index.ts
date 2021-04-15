import en from './en';

export type MessageId = keyof typeof en;

export type LocaleKey = keyof typeof MESSAGES;

export const MESSAGES = {
  en,
};
