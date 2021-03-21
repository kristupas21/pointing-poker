import React, { MouseEvent, useRef } from 'react';
import { motion } from 'framer-motion';
import { Identifier } from 'types/global';
import classNames from 'classnames/bind';
import { useOutsideClose } from 'utils/customHooks';
import SelectOption from '../SelectOption';
import styles from './SelectDropdown.module.scss';
import { FieldSize } from '../../types';

const cx = classNames.bind(styles);

type Props = {
  options: Identifier[];
  onSelect: (name: string) => void;
  onOutsideClick: (e) => void;
  selectedOptionId: string;
  fieldSize: FieldSize;
}

const SelectDropdown: React.FC<Props> = (props) => {
  const { options, onSelect, selectedOptionId, onOutsideClick, fieldSize } = props;
  const dropdownRef = useRef<HTMLSpanElement>(null);

  const handleSelect = (e: MouseEvent<HTMLButtonElement>, name: string) => {
    e.preventDefault();
    onSelect(name);
  };

  useOutsideClose(dropdownRef, onOutsideClick);

  return (
    <motion.span
      key="select-dropdown"
      ref={dropdownRef}
      className={cx('dropdown', `dropdown--${fieldSize}`)}
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

export default SelectDropdown;
