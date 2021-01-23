import React, { OptionHTMLAttributes } from 'react';

type Props = OptionHTMLAttributes<HTMLOptionElement>;

const Option: React.FC<Props> = (props) => {
  const { children } = props;

  return (
    <option {...props}>
      {children}
    </option>
  );
};

export default Option;
