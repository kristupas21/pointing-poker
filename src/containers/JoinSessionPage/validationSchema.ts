import * as Yup from 'yup';
import {
  GetValidationSchema, INPUT_MAX_CHARS, INPUT_MIN_CHARS, msgMax, msgMin, msgRequired,
} from '../../constants/formValidation';
import { JoinSessionFormData } from './JoinSessionPage';

const validationSchema: GetValidationSchema<JoinSessionFormData> = (text) => Yup.object().shape({
  sessionId: Yup.string()
    .required(text(msgRequired)),

  name: Yup.string()
    .min(INPUT_MIN_CHARS, text(msgMin, { chars: INPUT_MIN_CHARS }))
    .max(INPUT_MAX_CHARS, text(msgMax, { chars: INPUT_MAX_CHARS }))
    .required(text(msgRequired)),

  role: undefined,

  isObserver: undefined,
});

export default validationSchema;
