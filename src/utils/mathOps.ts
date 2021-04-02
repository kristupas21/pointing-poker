import sum from 'lodash/sum';
import random from 'lodash/random';
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

export function calcRandomInteger(min: number, max: number): number {
  return random(min, max);
}

export const calcFixedNumber = {
  ofTypeNumber(numberValue: number, digits = 1): number {
    return Number.isInteger(numberValue)
      ? parseFloat(`${numberValue}`)
      : Number(numberValue.toFixed(digits));
  },

  ofTypeString(stringValue: string, digits = 1): string {
    const numberValue = Number(stringValue);

    return Number.isInteger(numberValue)
      ? `${parseFloat(stringValue)}`
      : numberValue.toFixed(digits);
  },
};
