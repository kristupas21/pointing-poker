import React, { InputHTMLAttributes } from 'react';
import { Field, FieldAttributes } from 'formik';
import classNames from 'classnames/bind';
import withForwardRef from 'utils/withForwardRef';
import { SharedFieldProps } from '../types';
import styles from './Switch.module.scss';

const cx = classNames.bind(styles);

export type SwitchProps =
    FieldAttributes<InputHTMLAttributes<HTMLInputElement>> & SharedFieldProps;

const Switch: React.FC<SwitchProps> = (props) => {
  const { name, label = '', className, ...fieldProps } = props;

  return (
    <span className={cx('switch')}>
      <label htmlFor={name} className={cx('switch__wrapper')}>
        <Field
          {...fieldProps}
          name={name}
          id={name}
          type="checkbox"
          className={cx('switch__field', className)}
        />
        <span className={cx('switch__ui')} />
        <span className={cx('switch__label')}>
          {label}
        </span>
      </label>
    </span>
  );
};

export default withForwardRef(Switch);
