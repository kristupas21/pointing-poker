import React, { RefObject, useState } from 'react';
import classNames from 'classnames/bind';
import { FieldAttributes } from 'formik';
import { FieldType, SharedFieldProps } from '../types';
import Input, { InputProps } from '../Input';
import Select, { SelectProps } from '../Select';
import Checkbox, { CheckboxProps } from '../Checkbox';
import NumberInput, { NumberInputProps } from '../NumberInput';
import styles from './FormField.module.scss';

const cx = classNames.bind(styles);

type Props = FieldAttributes<any> & SharedFieldProps & {
  setRef?: RefObject<any>;
  isBlock?: boolean;
  type: FieldType;
}

const FormField: React.FC<Props> = (props) => {
  const { type, isBlock, setRef, renderTextWhenInactive, onFocus, onBlur, ...fieldProps } = props;

  const [isText, setIsText] = useState(renderTextWhenInactive);

  const handleFocus = (e) => {
    renderTextWhenInactive && setIsText(false);
    onFocus && onFocus(e);
  };
  const handleBlur = (e) => {
    renderTextWhenInactive && setIsText(true);
    onBlur && onBlur(e);
  };

  const renderContent = () => {
    switch (type) {
      case FieldType.Input:
        return (
          <Input
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...fieldProps as InputProps}
            ref={setRef}
            autoComplete="off"
            isText={isText}
          />
        );
      case FieldType.Select:
        return (
          <Select
            onFocus={onFocus}
            onBlur={onBlur}
            {...fieldProps as SelectProps}
            ref={setRef}
            autoComplete="off"
          />
        );
      case FieldType.Number:
        return (
          <NumberInput
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...fieldProps as NumberInputProps}
            ref={setRef}
            autoComplete="off"
            isText={isText}
          />
        );
      case FieldType.Checkbox:
        return (
          <Checkbox
            onFocus={onFocus}
            onBlur={onBlur}
            {...fieldProps as CheckboxProps}
            ref={setRef}
          />
        );
      default:
        return null;
    }
  };

  return (
    <span className={cx('field', { 'field--block': isBlock })}>
      {renderContent()}
    </span>
  );
};

export default FormField;
