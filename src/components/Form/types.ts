import { FormikHelpers } from 'formik';

export type SubmitHandler<T> = (values: T, helpers: FormikHelpers<T>) => void;
