import React, { useRef, SelectHTMLAttributes, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Identifier } from 'globalTypes';
import classNames from 'classnames/bind';
import { FieldAttributes } from 'formik';
import withForwardRef from 'utils/withForwardRef';
import { SharedFieldProps } from '../types';
import Input from '../Input';
import styles from './Select.module.scss';
import SelectDropdown from './SelectDropdown';

const cx = classNames.bind(styles);

type CustomProps = {
  options?: string[],
  uniqOptions?: Identifier[];
  setFieldValue: (field: string, value: string) => void;
};

export type SelectProps =
    FieldAttributes<SelectHTMLAttributes<HTMLSelectElement>> & SharedFieldProps & CustomProps;

const Select: React.FC<SelectProps> = (props) => {
  const {
    value,
    id,
    name,
    label,
    disabled,
    error,
    options,
    uniqOptions,
    placeholder,
    fieldSize,
    setFieldValue,
    className,
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
    if (inputRef.current?.contains(e.target)) {
      e.preventDefault();
    }

    closeDropdown();
  };

  const handleArrowMouseDown = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const getInputValue = () => (uniqOptions
    ? uniqOptions.find((o) => value === o.id).name || ''
    : value);

  return (
    <span className={cx('select')}>
      <Input
        value={getInputValue()}
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
        className={className}
      >
        <span
          className={cx('select__arrow', { 'select__arrow--up': isOpen })}
          onMouseDown={handleArrowMouseDown}
          role="presentation"
        />
      </Input>
      <AnimatePresence>
        {isOpen && (
          <SelectDropdown
            options={options}
            uniqOptions={uniqOptions}
            onSelect={handleOptionSelect}
            onOutsideClick={handleOutsideClick}
            fieldSize={fieldSize}
            selectedOption={value}
            key="dropdown"
          />
        )}
      </AnimatePresence>
    </span>
  );
};

export default withForwardRef(Select);
