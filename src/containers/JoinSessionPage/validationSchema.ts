import * as Yup from 'yup';
import { getText } from '../../components/Text';

const MIN = 2;
const MAX = 50;

export default Yup.object().shape({

  sessionId: Yup.string()
    .required(getText('form.validation.required')),

  name: Yup.string()
    .min(MIN, getText('form.validation.min', { chars: MIN }))
    .max(MAX, getText('form.validation.max', { chars: MAX }))
    .required(getText('form.validation.required')),
});
