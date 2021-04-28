import { MessageId } from 'lang';
import { FormikHelpers, FormikProps } from 'formik';

export type SubmitHandler<T> = (values: T, helpers: FormHelpers<T>) => void;

export type CustomFormError = { id: MessageId; values?: any };

export type CustomFormErrors<T = { [key: string]: any }> = Record<keyof T, CustomFormError>;

export type FormHelpers<T = any> = FormikHelpers<T> &
    { setFieldError(key: string, error: CustomFormError) };

export type FormProps<T = any> = FormikProps<T> &
    { setFieldError(key: string, error: CustomFormError) } &
    { errors: CustomFormErrors<T> };
