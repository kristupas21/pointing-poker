import React, { InputHTMLAttributes } from 'react';
import { Field, FieldAttributes } from 'formik';

export type InputProps = FieldAttributes<InputHTMLAttributes<HTMLInputElement>>;

const Input: React.FC<InputProps> = (props) => {
  const { name } = props;

  return (
    <Field
      {...props}
      id={name}
      type="input"
    />
  );
};

export default Input;
