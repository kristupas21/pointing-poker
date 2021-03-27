import sum from 'lodash/sum';
import { PointValue } from 'utils/pointValues/types';

export function calcAverage(values: number[]): string {
  return values.length
    ? (sum(values) / values.length).toString()
    : null;
}

export function calcDiff(x: string, y: string): number {
  return Math.abs(Number(x) - Number(y));
}

export function calcClosestPoint(avg: string, points: PointValue[]): string {
  return points.reduce((currentValue, point) => {
    const diff = calcDiff(avg, point.value);
    const prevDiff = calcDiff(avg, currentValue);

    return diff <= prevDiff ? point.value : currentValue;
  }, points[0]?.value || '0');
}

export function calcRandomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
