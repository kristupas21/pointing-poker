import React, { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { getIcon, IconId } from '../../utils/iconMap';

const cx = classNames.bind(styles);

export enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Danger = 'danger',
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: IconId;
  variant?: ButtonVariant;
}

const Button: React.FC<Props> = (props) => {
  const { variant = ButtonVariant.Primary, className, children, type = 'button', icon, ...other } = props;
  const classes = cx('button', `button--${variant}`, className);
  const Icon = icon ? getIcon(icon) : React.Fragment;

  return (
  // eslint-disable-next-line react/button-has-type
    <button className={classes} type={type} {...other}>
      {icon && <span data-component="Icon"><Icon /></span>}
      {children}
    </button>
  );
};

export default Button;
