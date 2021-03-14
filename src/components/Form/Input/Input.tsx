import React, { InputHTMLAttributes } from 'react';
import { Field, FieldAttributes } from 'formik';
import classNames from 'classnames/bind';
import { SharedFieldProps, FieldSize } from '../types';
import styles from './Input.module.scss';
import FieldError from '../FieldError';

const cx = classNames.bind(styles);

export type InputProps = FieldAttributes<InputHTMLAttributes<HTMLInputElement>> & SharedFieldProps;

const Input: React.FC<InputProps> = (props) => {
  const { name, label, size = FieldSize.Medium, error, ...fieldProps } = props;

  return (
    <span className={cx('input', `input--${size}`)}>
      {label && (
        <label
          htmlFor={name}
          className={cx('input__label')}
        >
          {label}
        </label>
      )}
      <Field
        {...fieldProps}
        name={name}
        id={name}
        type="input"
        className={cx('input__field', { 'input__field--error': !!error })}
      />
      {error && <FieldError className={cx('input__error')}>{error}</FieldError>}
    </span>
  );
};

export default Input;
