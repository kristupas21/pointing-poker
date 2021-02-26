import * as Yup from 'yup';
import { SchemaOf } from 'yup';
import {
  INPUT_MAX_CHARS, INPUT_MIN_CHARS, msgMax, msgMin, msgRequired,
} from '../../constants/formValidation';
import { CreateSessionFormData } from './CreateSessionForm';
import { getText } from '../../components/Text';

const defaultSchemaProps = () => ({
  name: Yup.string()
    .min(INPUT_MIN_CHARS, getText(msgMin, { chars: INPUT_MIN_CHARS }))
    .max(INPUT_MAX_CHARS, getText(msgMax, { chars: INPUT_MAX_CHARS }))
    .required(getText(msgRequired)),

  role: Yup.string()
    .when('useRoles', {
      is: true,
      then: Yup.string()
        .when('isObserver', {
          is: false,
          then: Yup.string().required(getText(msgRequired))
        })
    }),

  isObserver: Yup.boolean(),

  useRoles: Yup.boolean(),
});

export const joinSessionValidationSchema: SchemaOf<CreateSessionFormData> =
    Yup.object().shape({
      ...defaultSchemaProps(),
      sessionId: Yup.string().required(getText(msgRequired)),
    });

export const startSessionValidationSchema: SchemaOf<CreateSessionFormData> =
    Yup.object().shape({
      ...defaultSchemaProps(),
      sessionId: undefined,
    });
