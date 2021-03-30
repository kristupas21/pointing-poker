import { FormikHelpers } from 'formik';
import { ReactNode } from 'react';

export type SubmitHandler<T> = (values: T, helpers: FormikHelpers<T>) => void;

export enum FieldType {
  Input = 'input',
  Select = 'select',
  Checkbox = 'checkbox',
  Number = 'number',
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
