import React, { SelectHTMLAttributes } from 'react';
import { Field, FieldAttributes } from 'formik';

type Props = FieldAttributes<SelectHTMLAttributes<HTMLSelectElement>>;

const Select: React.FC<Props> = (props) => {
  const { name } = props;

  return (
    <Field
      {...props}
      id={name}
      as="select"
    />
  );
};

export default Select;
