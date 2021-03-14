import React, { RefObject, MouseEvent, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Identifier } from 'types/global';
import classNames from 'classnames/bind';
import withForwardRef from 'utils/withForwardRef';
import animations from 'utils/animations';
import SelectOption from '../SelectOption';
import styles from './SelectDropdown.module.scss';
import { FieldSize } from '../../types';

const cx = classNames.bind(styles);

type Props = {
  innerRef?: RefObject<HTMLSpanElement>;
  options: Identifier[];
  onSelect: (name: string) => void;
  onOutsideClick: (e) => void;
  selectedOptionId: string;
  size: FieldSize;
}

const SelectDropdown: React.FC<Props> = (props) => {
  const { options, innerRef, onSelect, selectedOptionId, onOutsideClick, size } = props;

  const handleSelect = (e: MouseEvent<HTMLButtonElement>, name: string) => {
    e.preventDefault();
    onSelect(name);
  };

  useEffect(() => {
    window.addEventListener('click', onOutsideClick);
    return () => window.removeEventListener('click', onOutsideClick);
  }, []);

  return (
    <motion.span
      key="select-dropdown"
      ref={innerRef}
      className={cx('dropdown', `dropdown--${size}`)}
      {...animations.simpleOpacity}
    >
      {options.map((o) => (
        <SelectOption
          key={o.id}
          onClick={(e) => handleSelect(e, o.id)}
          isSelected={selectedOptionId === o.id}
        >
          {o.name}
        </SelectOption>
      ))}
    </motion.span>
  );
};

export default withForwardRef(SelectDropdown);
