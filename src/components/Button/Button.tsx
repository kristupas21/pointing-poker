import React from 'react';
import { Button as ButtonBP, IButtonProps } from '@blueprintjs/core';

const Button: React.FC<IButtonProps> = ({ children, ...other }) => (
  <ButtonBP {...other}>
    {children}
  </ButtonBP>
);

export default Button;
