import { PointValueLib, PointValueOption } from './types';

export const POINT_VALUE_INFINITY = '∞';
export const POINT_VALUE_UNKNOWN = '?';

const DEFAULT_POINT_VALUE_LIB: PointValueOption[] = [
  { pos: 0, value: '0' },
  { pos: 1, value: '1' },
  { pos: 2, value: '2' },
  { pos: 3, value: '3' },
  { pos: 4, value: '5' },
  { pos: 5, value: '8' },
  { pos: 6, value: '13' },
  { pos: 7, value: '21' },
  { pos: 8, value: '40' },
  { pos: 9, value: '100' },
  { pos: 10, value: POINT_VALUE_INFINITY },
  { pos: 11, value: POINT_VALUE_UNKNOWN },
];

const NUMERIC_POINT_VALUE_LIB: PointValueOption[] = [
  { pos: 0, value: '0' },
  { pos: 1, value: '1' },
  { pos: 2, value: '2' },
  { pos: 3, value: '3' },
  { pos: 4, value: '4' },
  { pos: 5, value: '5' },
  { pos: 6, value: '6' },
  { pos: 7, value: '7' },
  { pos: 8, value: '8' },
  { pos: 9, value: '9' },
  { pos: 10, value: POINT_VALUE_INFINITY },
  { pos: 11, value: POINT_VALUE_UNKNOWN },
];

export const POINT_VALUE_LIBRARIES: Record<PointValueLib, PointValueOption[]> = {
  [PointValueLib.Default]: DEFAULT_POINT_VALUE_LIB,
  [PointValueLib.Numeric]: NUMERIC_POINT_VALUE_LIB,
};
