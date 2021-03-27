import React, { MouseEvent } from 'react';
import { Identifier } from 'globalTypes';
import classNames from 'classnames/bind';
import Popover from 'components/Popover';
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
  const className = cx('dropdown', `dropdown--${fieldSize}`);

  const handleSelect = (e: MouseEvent<HTMLButtonElement>, name: string) => {
    e.preventDefault();
    onSelect(name);
  };

  return (
    <Popover onClose={onOutsideClick} className={className}>
      {options.map((o) => (
        <SelectOption
          key={o.id}
          onClick={(e) => handleSelect(e, o.id)}
          isSelected={selectedOptionId === o.id}
        >
          {o.name}
        </SelectOption>
      ))}
    </Popover>
  );
};

export default SelectDropdown;
