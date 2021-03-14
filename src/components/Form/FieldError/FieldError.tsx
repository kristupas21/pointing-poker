import React from 'react';
import classNames from 'classnames/bind';
import styles from './FieldError.module.scss';

const cx = classNames.bind(styles);

type Props = {
  className?: string;
}

const FieldError: React.FC<Props> = (props) => {
  const { children, className } = props;

  return (
    <span className={cx('field-error', className)}>
      {children}
    </span>
  );
};

export default FieldError;
