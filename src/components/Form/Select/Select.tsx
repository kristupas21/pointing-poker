import React, { useRef, SelectHTMLAttributes, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Identifier } from 'types/global';
import classNames from 'classnames/bind';
import { FieldAttributes } from 'formik';
import withForwardRef from 'utils/withForwardRef';
import { SharedFieldProps } from '../types';
import Input from '../Input';
import styles from './Select.module.scss';
import SelectDropdown from './SelectDropdown';

const cx = classNames.bind(styles);

export type SelectProps = FieldAttributes<SelectHTMLAttributes<HTMLSelectElement>> & SharedFieldProps & {
  options: Identifier[],
  setFieldValue: (field: string, value: string) => void;
};

const Select: React.FC<SelectProps> = (props) => {
  const {
    value,
    id,
    name,
    label,
    disabled,
    error,
    options = [],
    placeholder,
    fieldSize,
    setFieldValue
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLSelectElement>(null);

  const openDropdown = () => {
    isOpen || setIsOpen(true);
  };

  const closeDropdown = () => {
    isOpen && setIsOpen(false);
  };

  const handleFocus = () => {
    inputRef.current.blur();
    openDropdown();
  };

  const handleOptionSelect = (optionId: string) => {
    setFieldValue(name, optionId);
    closeDropdown();
  };

  const handleOutsideClick = (e) => {
    inputRef.current?.contains(e.target) && e.preventDefault();
    closeDropdown();
  };

  return (
    <span className={cx('select')}>
      <Input
        value={options.find((o) => value === o.id)?.name || ''}
        id={id}
        name={name}
        label={label}
        error={error}
        onFocus={handleFocus}
        onChange={undefined}
        onBlur={undefined}
        readOnly
        fieldSize={fieldSize}
        ref={inputRef}
        placeholder={placeholder}
        disabled={disabled}
      >
        <span
          className={cx('select__arrow', { 'select__arrow--up': isOpen })}
          onMouseDown={openDropdown}
          role="presentation"
        />
      </Input>
      <AnimatePresence>
        {isOpen && (
          <SelectDropdown
            options={options}
            onSelect={handleOptionSelect}
            onOutsideClick={handleOutsideClick}
            fieldSize={fieldSize}
            selectedOptionId={value}
            key="dropdown"
          />
        )}
      </AnimatePresence>
    </span>
  );
};

export default withForwardRef(Select);
