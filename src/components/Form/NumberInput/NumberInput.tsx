import React, { InputHTMLAttributes } from 'react';
import { Field, FieldAttributes } from 'formik';
import classNames from 'classnames/bind';
import withForwardRef from 'utils/withForwardRef';
import { NUMBER_INPUT_MAX, NUMBER_INPUT_MIN } from 'utils/form/constants';
import { SharedFieldProps, FieldSize, SharedFieldState } from '../types';
import styles from '../Input/Input.module.scss';
import FieldError from '../FieldError';

const cx = classNames.bind(styles);

export type NumberInputProps =
    FieldAttributes<InputHTMLAttributes<HTMLInputElement>> & SharedFieldProps & SharedFieldState;

const NumberInput: React.FC<NumberInputProps> = (props) => {
  const {
    name,
    label,
    fieldSize = FieldSize.Medium,
    error,
    children,
    min = NUMBER_INPUT_MIN,
    max = NUMBER_INPUT_MAX,
    isText,
    value,
    className,
    ...fieldProps
  } = props;

  const inputClasses = cx('input__field', {
    'input__field--error': !!error,
    'input__field--hidden': isText,
  }, className);

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
        type="number"
        min={min}
        max={max}
        className={inputClasses}
        {...getValueProps()}
      />
      {children}
      {error && <FieldError className={cx('input__error')}>{error}</FieldError>}
    </span>
  );
};

export default withForwardRef(NumberInput);
