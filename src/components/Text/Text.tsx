import React, { memo } from 'react';
import { getText } from './utils';
import { MessageId } from '../../lang';

interface Props {
  className?: string;
  id: MessageId;
  locale?: string;
  values?: Record<string, string>;
  tag?: keyof HTMLElementTagNameMap;
}

const Text: React.FC<Props> = (props) => {
  const { className, id, locale = 'en', values, tag } = props;
  const Tag = tag ? ({ children: c, className: cl }) =>
    React.createElement(tag, { className: cl }, c) : React.Fragment;
  const tagProps = tag && { className };

  return (
    <Tag {...tagProps}>
      {getText(id, values, locale)}
    </Tag>
  );
};

export default memo(Text);
