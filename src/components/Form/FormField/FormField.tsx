import React, { ReactNode } from 'react';
import { FieldType } from '../types';
import Input, { InputProps } from '../Input';
import Select, { SelectProps } from '../Select';
import Label from '../Label';
import FieldError from '../FieldError';

type Props = (InputProps | SelectProps) & {
  label?: ReactNode;
  error?: ReactNode;
  type: FieldType;
}

const FormField: React.FC<Props> = (props) => {
  const { type, error, label, ...fieldProps } = props;

  const renderContent = () => {
    switch (type) {
      case FieldType.Input:
        return <Input {...fieldProps as InputProps} />;
      case FieldType.Select:
        return <Select {...fieldProps as SelectProps} />;
      default:
        return null;
    }
  };

  return (
    <>
      {label && <Label htmlFor={fieldProps.name}>{label}</Label>}
      {renderContent()}
      {error && <FieldError>{error}</FieldError>}
    </>
  );
};

export default FormField;
