import React, { MouseEventHandler } from 'react';
import classNames from 'classnames/bind';
import Button from 'components/Button';
import styles from './SelectOption.module.scss';

const cx = classNames.bind(styles);

type Props = {
  onClick: MouseEventHandler<HTMLButtonElement>,
  isSelected: boolean;
}

const SelectOption: React.FC<Props> = (props) => {
  const { onClick, isSelected, children } = props;
  const buttonClasses = cx('button', { 'button--selected': isSelected });

  return (
    <Button className={buttonClasses} onClick={onClick}>
      {children}
    </Button>
  );
};

export default SelectOption;
