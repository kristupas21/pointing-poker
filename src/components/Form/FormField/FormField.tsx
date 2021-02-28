import React, { ReactNode } from 'react';
import classNames from 'classnames/bind';
import { FieldType } from '../types';
import Input, { InputProps } from '../Input';
import Select, { SelectProps } from '../Select';
import Label from '../Label';
import FieldError from '../FieldError';
import Checkbox, { CheckboxProps } from '../Checkbox';
import styles from './FormField.module.scss';

const cx = classNames.bind(styles);

type Props = (InputProps | SelectProps | CheckboxProps) & {
  label?: ReactNode;
  error?: ReactNode;
  isBlock?: boolean;
  type: FieldType;
}

const FormField: React.FC<Props> = (props) => {
  const { type, error, label, isBlock, ...fieldProps } = props;

  const renderContent = () => {
    switch (type) {
      case FieldType.Input:
        return <Input {...fieldProps as InputProps} />;
      case FieldType.Select:
        return <Select {...fieldProps as SelectProps} />;
      case FieldType.Checkbox:
        return <Checkbox {...fieldProps as CheckboxProps} />;
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
