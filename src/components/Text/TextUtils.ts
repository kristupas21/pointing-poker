import { MessageId, MESSAGES } from '../../lang';

export function replaceValues(message: string, prop: string, value: string): string {
  return message.split(`{${prop}}`).join(value);
}

export function getTranslation(id: MessageId, args: Record<string, string> = null, locale = 'en'): string {
  let value = MESSAGES[locale][id];

  if (!args) {
    return value;
  }

  Object.entries(args).forEach(([key, v]) => {
    value = replaceValues(value, key, v);
  });

  return value;
}
