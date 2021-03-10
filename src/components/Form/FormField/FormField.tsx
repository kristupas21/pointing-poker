import React, { ReactNode, RefObject } from 'react';
import classNames from 'classnames/bind';
import withForwardRef from 'utils/withForwardRef';
import { FieldType } from '../types';
import InputField, { InputProps } from '../Input';
import SelectField, { SelectProps } from '../Select';
import Label from '../Label';
import FieldError from '../FieldError';
import CheckboxField, { CheckboxProps } from '../Checkbox';
import styles from './FormField.module.scss';

const Input = withForwardRef(InputField);
const Select = withForwardRef(SelectField);
const Checkbox = withForwardRef(CheckboxField);

const cx = classNames.bind(styles);

type Props = (InputProps | SelectProps | CheckboxProps) & {
  label?: ReactNode;
  error?: string;
  setRef?: RefObject<any>;
  isBlock?: boolean;
  type: FieldType;
}

const FormField: React.FC<Props> = (props) => {
  const { type, error, label, isBlock, setRef, ...fieldProps } = props;

  const renderContent = () => {
    switch (type) {
      case FieldType.Input:
        return <Input {...fieldProps as InputProps} ref={setRef} />;
      case FieldType.Select:
        return <Select {...fieldProps as SelectProps} ref={setRef} />;
      case FieldType.Checkbox:
        return <Checkbox {...fieldProps as CheckboxProps} ref={setRef} />;
      default:
        return null;
    }
  };

  return (
    <span className={cx('field', { 'field--block': isBlock })}>
      {label && <Label htmlFor={fieldProps.name}>{label}</Label>}
      {renderContent()}
      {error && <FieldError>{error}</FieldError>}
    </span>
  );
};

export default FormField;
