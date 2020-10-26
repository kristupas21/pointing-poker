import React, { memo } from 'react';
import { msg } from '../../lang/en';

interface Props {
  id: string;
  values?: Record<string, string>;
  tagName?: keyof HTMLElementTagNameMap;
}

const FormattedMessage: React.FC<Props> = (props) => {
  const { id, values, tagName } = props;
  const Tag = tagName ? ({ children: c }) => React.createElement(tagName, {}, c) : React.Fragment;

  return (
    <Tag>
      {msg(id, values)}
    </Tag>
  );
};

export default memo(FormattedMessage);
