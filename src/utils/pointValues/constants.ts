import { PointValue } from './types';

export const POINT_VALUE_INFINITY = '∞';

export const POINT_VALUE_UNKNOWN = '?';

export const DEFAULT_POINT_VALUES: PointValue[] = [
  { id: 'default-0', pos: 0, value: '0' },
  { id: 'default-1', pos: 1, value: '1' },
  { id: 'default-2', pos: 2, value: '2' },
  { id: 'default-3', pos: 3, value: '3' },
  { id: 'default-4', pos: 4, value: '5' },
  { id: 'default-5', pos: 5, value: '8' },
  { id: 'default-6', pos: 6, value: '13' },
  { id: 'default-7', pos: 7, value: '21' },
  { id: 'default-8', pos: 8, value: '40' },
  { id: 'default-9', pos: 9, value: '100' },
  { id: 'default-10', pos: 10, value: POINT_VALUE_INFINITY, mandatoryId: 'infinity' },
  { id: 'default-11', pos: 11, value: POINT_VALUE_UNKNOWN, mandatoryId: 'unknown' },
];
