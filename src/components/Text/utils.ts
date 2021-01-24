import { MessageId, MESSAGES } from '../../lang';

export function replaceValues(message: string, prop: string, value: string): string {
  return message.split(`{${prop}}`).join(value);
}

export function getText(id: MessageId, args: Record<string, string | number> = null, locale = 'en'): string {
  const localeMessages = MESSAGES[locale];

  if (!(id in localeMessages)) {
    // eslint-disable-next-line no-console
    console.error(`Message with id "${id}" does not exist in messages.`);
    return id;
  }

  let value = localeMessages[id];

  if (!args) {
    return value;
  }

  Object.entries(args).forEach(([key, v]) => {
    value = replaceValues(value, key, `${v}`);
  });

  return value;
}
