import { FormikHelpers } from 'formik';

export type SubmitHandler<T> = (values: T, helpers: FormikHelpers<T>) => void;

export enum FieldType {
  Input = 'input',
  Select = 'select',
  Checkbox = 'checkbox',
}
