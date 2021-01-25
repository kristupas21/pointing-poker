import React, { InputHTMLAttributes } from 'react';
import { Field, FieldAttributes } from 'formik';

export type CheckboxProps = FieldAttributes<InputHTMLAttributes<HTMLInputElement>>;

const Checkbox: React.FC<CheckboxProps> = (props) => {
  const { name } = props;

  return (
    <Field
      {...props}
      id={name}
      type="checkbox"
    />
  );
};

export default Checkbox;
