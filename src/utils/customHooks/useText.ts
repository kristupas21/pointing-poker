import { useSelector } from 'react-redux';
import { MessageId, MESSAGES } from 'lang';
import { getAppLocale } from 'state/app/appStateGetters';

type Args = Record<string, string | number>;
type TextFn = (id: MessageId, args?: Args) => string;

function replaceValues(message: string, prop: string, value: string): string {
  return message.split(`{${prop}}`).join(value);
}

function getText(id: MessageId, args: Args = null, locale = 'en'): string {
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

export default (): TextFn => {
  const locale = useSelector(getAppLocale);

  return (id, args = null) => getText(id, args, locale);
};
