import React, { MouseEvent } from 'react';
import { Identifier } from 'globalTypes';
import classNames from 'classnames/bind';
import Popover from 'components/Popover';
import SelectOption from '../SelectOption';
import styles from './SelectDropdown.module.scss';
import { FieldSize } from '../../types';

const cx = classNames.bind(styles);

type Props = {
  options?: string[];
  uniqOptions?: Identifier[];
  onSelect: (name: string) => void;
  onOutsideClick: (e) => void;
  selectedOption: string;
  fieldSize: FieldSize;
  stretch?: boolean;
}

const SelectDropdown: React.FC<Props> = (props) => {
  const {
    options,
    uniqOptions,
    onSelect,
    selectedOption,
    onOutsideClick,
    fieldSize,
    stretch
  } = props;

  const className = cx(
    'dropdown',
    `dropdown--${fieldSize}`,
    { 'dropdown--stretch': stretch }
  );

  const handleSelect = (e: MouseEvent<HTMLButtonElement>, name: string) => {
    e.preventDefault();
    onSelect(name);
  };

  return (
    <Popover onClose={onOutsideClick} className={className}>
      {uniqOptions
        ? uniqOptions.map((o) => (
          <SelectOption
            key={o.id}
            onClick={(e) => handleSelect(e, o.id)}
            isSelected={selectedOption === o.id}
          >
            {o.name}
          </SelectOption>
        ))
        : (options || []).map((o) => (
          <SelectOption
            key={o}
            onClick={(e) => handleSelect(e, o)}
            isSelected={selectedOption === o}
          >
            {o}
          </SelectOption>
        ))}
    </Popover>
  );
};

export default SelectDropdown;
