import React, { SelectHTMLAttributes } from 'react';
import { Field, FieldAttributes } from 'formik';
import { Identifier } from '../../../types/global';
import Option from '../Option';

export type SelectProps = FieldAttributes<SelectHTMLAttributes<HTMLSelectElement>> & {
  options: Identifier[],
  emptyOptionText?: string;
};

const Select: React.FC<SelectProps> = (props) => {
  const { name, options = [], emptyOptionText, ...fieldProps } = props;

  return (
    <Field
      {...fieldProps}
      name={name}
      id={name}
      as="select"
    >
      {emptyOptionText && (
        <Option value="" disabled>{emptyOptionText}</Option>
      )}
      {options.map((option) => (
        <Option value={option.id} key={option.id}>
          {option.name}
        </Option>
      ))}
    </Field>
  );
};

export default Select;
