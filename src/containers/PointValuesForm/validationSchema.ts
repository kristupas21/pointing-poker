import * as Yup from 'yup';
import { SchemaOf } from 'yup';
import { PointValue } from 'utils/pointValues/types';
import { NUMBER_INPUT_MAX, NUMBER_INPUT_MIN } from 'utils/form/constants';
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
      [withPVF(curr.pos)]: Yup.number().min(NUMBER_INPUT_MIN).max(NUMBER_INPUT_MAX),
    };
  }, {});

  return Yup.object().shape({
    ...getSchema(),
  });
};
