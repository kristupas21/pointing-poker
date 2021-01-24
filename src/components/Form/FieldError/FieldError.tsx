import React from 'react';
import classNames from 'classnames/bind';
import styles from './FieldError.module.scss';

const cx = classNames.bind(styles);

const FieldError: React.FC = (props) => {
  const { children } = props;

  return (
    <span className={cx('field-error')}>
      {children}
    </span>
  );
};

export default FieldError;
