import React, { ButtonHTMLAttributes, RefObject, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import Icon, { IconId } from '../Icon';
import withForwardRef from '../../utils/withForwardRef';

/* eslint-disable react/button-has-type */
const cx = classNames.bind(styles);

let wiggleTimeout: ReturnType<typeof setTimeout>;
let clickTimeout: ReturnType<typeof setTimeout>;

export enum ButtonVariant {
  None = 'none',
  Primary = 'primary',
  Secondary = 'secondary',
  Danger = 'danger',
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: IconId;
  innerRef?: RefObject<HTMLButtonElement>;
  isBlock?: boolean;
  isMinimal?: boolean;
  isOutline?: boolean;
  variant?: ButtonVariant;
}

const Button: React.FC<Props> = (props) => {
  const {
    variant = ButtonVariant.None,
    className,
    children,
    type = 'button',
    icon,
    isMinimal,
    isOutline,
    isBlock,
    disabled,
    onClick,
    onMouseDown,
    innerRef,
    ...other
  } = props;

  const btnRef = useRef<HTMLButtonElement>(innerRef?.current || null);

  const classes = cx('button', `button--${variant}`,
    {
      'button--minimal': isMinimal,
      'button--outline': isOutline,
      'button--block': isBlock,
      'button--disabled': disabled,
    },
    className);

  const handleClick = (e) => {
    if (disabled) {
      return;
    }

    clickTimeout && clearTimeout(clickTimeout);

    if (onClick) {
      clickTimeout = setTimeout(() => onClick(e), 70);
    }
  };

  const handleMouseDown = (e) => {
    if (disabled) {
      wiggleTimeout && clearTimeout(wiggleTimeout);

      if (btnRef.current) {
        btnRef.current.classList.add('-wiggle');

        wiggleTimeout = setTimeout(() => {
          btnRef.current.classList.remove('-wiggle');
        }, 300);
      }

      return;
    }

    onMouseDown && onMouseDown(e);
  };

  return (
    <button
      type={type}
      className={classes}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      ref={btnRef}
      aria-disabled={disabled}
      {...other}
    >
      {icon && <Icon id={icon} />}
      {children}
    </button>
  );
};

/* eslint-enable react/button-has-type */

export default withForwardRef(Button);
