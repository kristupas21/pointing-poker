import React, { InputHTMLAttributes, useState } from 'react';
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
    className,
    wrapperClassName,
    stretch,
    disabled,
    onFocus,
    onBlur,
    ...fieldProps
  } = props;

  const [isFocused, setIsFocused] = useState(false);

  const inputClasses = cx('input__field', {
    'input__field--hidden': isText,
  }, className);

  const wrapperClasses = cx('input', `input--${fieldSize}`, {
    'input--focused': isFocused,
    'input--error': !!error,
    'input--disabled': !!disabled,
    'input--stretch': !!stretch,
  }, wrapperClassName);

  const getValueProps = () => (value != null ? { value } : {});

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus && onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur && onBlur(e);
  };

  return (
    <span className={wrapperClasses}>
      {label && (
        <div className={cx('input__label-wrap')}>
          <div className={cx('input__label-back')} />
          <label
            htmlFor={name}
            className={cx('input__label')}
          >
            {label}
          </label>
        </div>
      )}
      {isText && <span className={cx('input__text')}>{value}</span>}
      <Field
        {...fieldProps}
        name={name}
        id={name}
        type="input"
        className={inputClasses}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...getValueProps()}
      />
      {children}
      {error && <FieldError className={cx('input__error')}>{error}</FieldError>}
    </span>
  );
};

export default withForwardRef(Input);
