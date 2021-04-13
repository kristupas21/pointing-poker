import { FormikHelpers } from 'formik';
import { ReactNode } from 'react';

export type SubmitHandler<T> = (values: T, helpers: FormikHelpers<T>) => void;

export enum FieldType {
  Checkbox = 'checkbox',
  Input = 'input',
  Number = 'number',
  Select = 'select',
  Switch = 'switch',
}

export enum FieldSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export interface SharedFieldProps {
  error?: string;
  label?: ReactNode;
  fieldSize?: FieldSize;
  name: string;
  id: string;
  isReadonly?: boolean;
}

export interface SharedFieldState {
  isText?: boolean;
}
