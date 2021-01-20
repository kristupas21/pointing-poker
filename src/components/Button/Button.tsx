import React, { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { ButtonVariant } from './types';

const cx = classNames.bind(styles);

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const Button: React.FC<Props> = (props) => {
  const { variant = ButtonVariant.Primary, className, children, type = 'button', ...other } = props;
  const classes = cx('button', `button--${variant}`, className);

  return (
  // eslint-disable-next-line react/button-has-type
    <button className={classes} type={type} {...other}>
      {children}
    </button>
  );
};

export default Button;