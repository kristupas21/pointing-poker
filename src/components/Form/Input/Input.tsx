import React, { InputHTMLAttributes } from 'react';
import { Field } from 'formik';

type Props = InputHTMLAttributes<HTMLInputElement>;

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
