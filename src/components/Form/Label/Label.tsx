import React, { LabelHTMLAttributes } from 'react';

type Props = LabelHTMLAttributes<HTMLLabelElement>;

const Label: React.FC<Props> = (props) => {
  const { children } = props;
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  return <label {...props}>{children}</label>;
};

export default Label;
