import React, { SVGProps, memo } from 'react';
import { IconId } from './types';
import getIcon from './iconMap';

interface Props extends SVGProps<SVGSVGElement>{
  id: IconId;
}

const Icon: React.FC<Props> = (props) => {
  const { id, focusable = 'false', ...svgProps } = props;
  const Component = getIcon(id);

  return (
    <Component {...svgProps} focusable={focusable} />
  );
};

export default memo(Icon);
