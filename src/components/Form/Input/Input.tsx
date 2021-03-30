import React, { InputHTMLAttributes } from 'react';
import { Field, FieldAttributes } from 'formik';
import classNames from 'classnames/bind';
import withForwardRef from 'utils/withForwardRef';
import { SharedFieldProps, FieldSize, SharedFieldState } from '../types';
import styles from './Input.module.scss';
import FieldError from '../FieldError';

const cx = classNames.bind(styles);

export type InputProps =
    FieldAttributes<InputHTMLAttributes<HTMLInputElement>> & SharedFieldProps & SharedFieldState;

const Input: React.FC<InputProps> = (props) => {
  const {
    name,
    label,
    fieldSize = FieldSize.Medium,
    error,
    children,
    isText,
    value,
    ...fieldProps
  } = props;

  const inputClasses = cx('input__field', {
    'input__field--error': !!error,
    'input__field--hidden': isText,
  });

  const getValueProps = () => (value != null ? { value } : {});

  return (
    <span className={cx('input', `input--${fieldSize}`)}>
      {label && (
        <label
          htmlFor={name}
          className={cx('input__label')}
        >
          {label}
        </label>
      )}
      {isText && <span className={cx('input__text')}>{value}</span>}
      <Field
        {...fieldProps}
        name={name}
        id={name}
        type="input"
        className={inputClasses}
        {...getValueProps()}
      />
      {children}
      {error && <FieldError className={cx('input__error')}>{error}</FieldError>}
    </span>
  );
};

export default withForwardRef(Input);
