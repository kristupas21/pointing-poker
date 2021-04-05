import * as Yup from 'yup';
import { SchemaOf } from 'yup';
import {
  INPUT_MAX_CHARS,
  INPUT_MIN_CHARS,
  FORM_ERR_MAX,
  FORM_ERR_MIN,
  FORM_ERR_REQUIRED,
} from 'utils/form/constants';
import { SessionFormData } from './types';

const defaultSchemaProps = () => ({
  sessionId: Yup.string().required({ id: FORM_ERR_REQUIRED }),

  name: Yup.string().trim()
    .min(INPUT_MIN_CHARS, { id: FORM_ERR_MIN, values: { chars: INPUT_MIN_CHARS } })
    .max(INPUT_MAX_CHARS, { id: FORM_ERR_MAX, values: { chars: INPUT_MAX_CHARS } })
    .required({ id: FORM_ERR_REQUIRED }),

  role: Yup.string()
    .when('useRoles', {
      is: true,
      then: Yup.string()
        .when('isObserver', {
          is: false,
          then: Yup.string().required({ id: FORM_ERR_REQUIRED }),
        })
    }),

  isObserver: Yup.boolean(),

  useRoles: Yup.boolean(),

  usePermissions: Yup.boolean(),
});

export const joinSessionValidationSchema: SchemaOf<SessionFormData> =
    Yup.object().shape({
      ...defaultSchemaProps(),
      usePermissions: undefined,
    });

export const startSessionValidationSchema: SchemaOf<SessionFormData> =
    Yup.object().shape({
      ...defaultSchemaProps(),
      sessionId: undefined,
    });
