import React, { ButtonHTMLAttributes, RefObject, useRef } from 'react';
import classNames from 'classnames/bind';
import Icon, { IconId } from 'components/Icon';
import withForwardRef from 'utils/withForwardRef';
import { Timeout } from 'types/global';
import styles from './Button.module.scss';

/* eslint-disable react/button-has-type */

const cx = classNames.bind(styles);

const wiggleClass = '-wiggle';

const wiggleTime = 300;

const clickDelay = 70;

export enum ButtonVariant {
  None = 'none',
  Primary = 'primary',
  Secondary = 'secondary',
  Danger = 'danger',
  Default = 'default',
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
    variant = ButtonVariant.Default,
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
  const wiggleTimeout = useRef<Timeout>();
  const clickTimeout = useRef<Timeout>();

  const classes = cx('button', `button--${variant}`,
    {
      'button--minimal': isMinimal,
      'button--outline': isOutline,
      'button--block': isBlock,
      'button--disabled': disabled,
    },
    className);

  const handleClick = (e) => {
    if (disabled || !onClick) {
      return;
    }

    clickTimeout.current = setTimeout(() => {
      onClick(e);
      clearTimeout(clickTimeout.current);
    }, clickDelay);
  };

  const handleMouseDown = (e) => {
    const { current: btn } = btnRef;

    if (!disabled) {
      onMouseDown && onMouseDown(e);
      return;
    }

    if (!btn) {
      return;
    }

    btn.classList.add(wiggleClass);

    wiggleTimeout.current = setTimeout(() => {
      btn.classList.remove(wiggleClass);
      clearTimeout(wiggleTimeout.current);
    }, wiggleTime);
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
