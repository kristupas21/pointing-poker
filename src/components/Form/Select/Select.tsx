import React, { createRef, SelectHTMLAttributes, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Identifier } from 'types/global';
import classNames from 'classnames/bind';
import { FieldAttributes } from 'formik';
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
    size,
    setFieldValue
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = createRef<HTMLSpanElement>();
  const inputRef = createRef<HTMLSelectElement>();

  const handleFocus = () => setIsOpen(true);

  const handleOptionSelect = (optionId: string) => {
    setFieldValue(name, optionId);
    setIsOpen(false);
  };

  const handleOutsideClick = (e) => {
    if (dropdownRef.current?.contains(e.target) || inputRef.current?.contains(e.target)) {
      return;
    }

    setIsOpen(false);
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
        readOnly
        onBlur={undefined}
        size={size}
        innerRef={inputRef as any}
        placeholder={placeholder}
        disabled={disabled}
      />
      <AnimatePresence>
        {isOpen && (
          <SelectDropdown
            options={options}
            onSelect={handleOptionSelect}
            onOutsideClick={handleOutsideClick}
            size={size}
            selectedOptionId={value}
            key="dropdown"
          />
        )}
      </AnimatePresence>
    </span>
  );
};

export default Select;
