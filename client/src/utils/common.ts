export function insertAtIndex<T>(arr: T[], idx: number, ...items: T[]): T[] {
  return [
    ...arr.slice(0, idx),
    ...items,
    ...arr.slice(idx)
  ];
}
