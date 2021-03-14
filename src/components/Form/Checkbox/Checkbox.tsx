import React, { InputHTMLAttributes } from 'react';
import { Field, FieldAttributes } from 'formik';
import classNames from 'classnames/bind';
import { SharedFieldProps } from '../types';
import styles from './Checkbox.module.scss';

const cx = classNames.bind(styles);

export type CheckboxProps = FieldAttributes<InputHTMLAttributes<HTMLInputElement>> & SharedFieldProps;

const Checkbox: React.FC<CheckboxProps> = (props) => {
  const { name, label = '', ...fieldProps } = props;

  return (
    <span className={cx('checkbox')}>
      <label htmlFor={name} className={cx('checkbox__wrapper')}>
        <Field
          {...fieldProps}
          name={name}
          id={name}
          type="checkbox"
          className={cx('checkbox__field')}
        />
        <span className={cx('checkbox__ui')} />
        <span className={cx('checkbox__label')}>
          {label}
        </span>
      </label>
    </span>
  );
};

export default Checkbox;
