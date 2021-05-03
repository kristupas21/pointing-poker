import { PointValue } from 'utils/pointValues/types';
import { FIELD_PLACEHOLDER } from '../../utils/form/constants';

export const withPVF = (pos: number | string) => `pvf-${pos}`;

export function mapPointValuesToFormData(points: PointValue[]): Record<string, string> {
  return points.reduce((acc, point) => ({
    ...acc,
    [withPVF(point.immutable ? point.id : point.pos)]: point.value,
  }), {});
}

export function focusPointValuePlaceholder(): void {
  const element = document.getElementById(FIELD_PLACEHOLDER);

  if (element) {
    element.focus();
  }
}
