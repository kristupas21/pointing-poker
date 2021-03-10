import * as Yup from 'yup';
import { SchemaOf } from 'yup';
import { PointValue } from 'utils/pointValues/types';
import { withPVF } from './utils';

export const getPointValuesFormSchema = (points: PointValue[]): SchemaOf<Record<string, any>> => {
  const getSchema = (): Record<string, any> => points.reduce((acc, curr) => {
    if (curr.mandatoryId) {
      return {
        ...acc,
        [withPVF(curr.mandatoryId)]: undefined,
      };
    }

    return {
      ...acc,
      [withPVF(curr.pos)]: Yup.number(),
    };
  }, {});

  return Yup.object().shape({
    ...getSchema(),
  });
};
