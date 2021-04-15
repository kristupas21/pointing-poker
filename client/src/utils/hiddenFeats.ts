const SECRET_VALUE = 'secret';

export function valueUnlocksHiddenFeats(value: string): boolean {
  return value.toLocaleLowerCase() === SECRET_VALUE;
}
