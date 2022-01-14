import React, { ButtonHTMLAttributes, RefObject, useRef } from 'react';
import classNames from 'classnames/bind';
import Icon, { IconId } from 'components/Icon';
import withForwardRef from 'utils/withForwardRef';
import { Timeout } from 'globalTypes';
import styles from './Button.module.scss';

/* eslint-disable react/button-has-type */

const cx = classNames.bind(styles);

const wiggleClass = '-wiggle';

const wiggleTime = 300;

export enum ButtonVariant {
  Plain = 'plain',
  Primary = 'primary',
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: IconId;
  innerRef?: RefObject<HTMLButtonElement>;
  variant?: ButtonVariant;
  block?: boolean;
  stretch?: boolean;
  selected?: boolean;
  round?: boolean;
  colored?: boolean;
}

const Button: React.FC<Props> = (props) => {
  const {
    variant = ButtonVariant.Plain,
    className,
    children,
    type = 'button',
    icon,
    block,
    stretch,
    disabled,
    onClick,
    onMouseDown,
    innerRef,
    selected,
    round,
    colored,
    ...other
  } = props;

  const btnRef = useRef<HTMLButtonElement>(innerRef?.current || null);
  const wiggleTimeout = useRef<Timeout>();

  const classes = cx('button', `button--${variant}`,
    {
      'button--block': block,
      'button--stretch': stretch,
      'button--disabled': disabled,
      'button--selected': selected,
      'button--round': round,
      'button--colored': colored,
    },
    className);

  const handleClick = (e) => {
    if (disabled || !onClick) {
      return;
    }

    onClick(e);
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
      {variant === ButtonVariant.Primary ? (
        <div className={cx('button__wrap')}>
          <div className={cx('button__back')} />
          <div className={cx('button__front')}>
            <div className={cx('button__content')}>
              {icon && <Icon id={icon} />}
              {children}
            </div>
          </div>
        </div>
      )
        :
        (
          <>
            {icon && <Icon id={icon} />}
            {children}
          </>
        )}
    </button>
  );
};

/* eslint-enable react/button-has-type */

export default withForwardRef(Button);
