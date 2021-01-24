import { SchemaOf } from 'yup';
import { MessageId } from '../lang';
import { GetText } from '../components/Text';

export const INPUT_MIN_CHARS = 2;

export const INPUT_MAX_CHARS = 50;

export const msgRequired: MessageId = 'form.validation.required';

export const msgMin: MessageId = 'form.validation.min';

export const msgMax: MessageId = 'form.validation.max';

export type GetValidationSchema<T> = (textGetter: GetText) => SchemaOf<Partial<T>>;
