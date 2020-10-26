const MESSAGES = {
  'app.title': 'Pointing Poker',
  'buttons.ok': 'OK',
  'buttons.cancel': 'Cancel',
  'complex.msg': 'Hello, {name}!',
};

export function replaceValues(message: string, prop: string, value: string): string {
  return message.split(`{${prop}}`).join(value);
}

export function msg(id: string, args?: Record<string, string>): string {
  let value = MESSAGES[id];

  if (!args) {
    return value;
  }

  Object.entries(args).forEach(([key, v]) => {
    value = replaceValues(value, key, v);
  });

  return value;
}
