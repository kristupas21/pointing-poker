import * as Yup from 'yup';
import { SchemaOf } from 'yup';
import { withURF } from './utils';
import { MAX_ROLE_CHARS_COUNT } from './constants';

export const getRolesFormSchema = (roles: string[]): SchemaOf<Record<string, any>> => {
  const getSchema = (): Record<string, any> => roles.reduce((acc, curr) => ({
    ...acc,
    [withURF(curr)]: Yup.string().max(MAX_ROLE_CHARS_COUNT),
  }), {});

  return Yup.object().shape({
    ...getSchema(),
  });
};
