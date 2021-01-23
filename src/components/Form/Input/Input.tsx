import React, { InputHTMLAttributes } from 'react';
import { Field, FieldAttributes } from 'formik';

type Props = FieldAttributes<InputHTMLAttributes<HTMLInputElement>>;

const Input: React.FC<Props> = (props) => {
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
