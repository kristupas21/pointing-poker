import { PointValue } from '../../utils/pointValues/types';

export const withPVF = (pos: number | string) => `pvf-${pos}`;

export function mapPointValuesToFormData(points: PointValue[]): Record<string, string> {
  return points.reduce((acc, point) => ({
    ...acc,
    [withPVF(point.mandatoryId || point.pos)]: point.value,
  }), {});
}
