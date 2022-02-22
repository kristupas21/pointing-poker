export function insertAtIndex<T>(arr: T[], idx: number, ...items: T[]): T[] {
  return [
    ...arr.slice(0, idx),
    ...items,
    ...arr.slice(idx)
  ];
}

export function sortAlphabetically(items: string[]): string[] {
  return (items || []).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
}
