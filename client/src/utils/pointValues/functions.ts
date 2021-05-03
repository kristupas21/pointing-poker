import { PointValue } from './types';

export function generatePointValueId(): string {
  return `custom-${new Date().getTime()}`;
}

export function mapPointIndexToPos(point: PointValue, idx: number): PointValue {
  return { ...point, pos: idx };
}
