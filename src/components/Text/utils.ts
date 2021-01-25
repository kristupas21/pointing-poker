import { MessageId, MESSAGES } from '../../lang';
import { State } from '../../types/global';

export type GetText = (id: MessageId, args?: Record<string, string | number>, locale?: string) => string;

export function replaceValues(message: string, prop: string, value: string): string {
  return message.split(`{${prop}}`).join(value);
}

export const getText: GetText = (id, args = null, locale = 'en') => {
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
};

export const mapLocaleToProps = (state: State) => ({
  locale: state.app.locale,
});
