import React, { memo } from 'react';
import { MessageId } from '../../lang';
import withText, { WithText } from './withText';

interface Props extends WithText {
  className?: string;
  id: MessageId;
  locale?: string;
  values?: Record<string, string>;
  tag?: keyof HTMLElementTagNameMap;
}

const Text: React.FC<Props> = (props) => {
  const { className, id, locale = 'en', values, tag, getText } = props;
  const Tag = tag ? ({ children: c, className: cl }) =>
    React.createElement(tag, { className: cl }, c) : React.Fragment;
  const tagProps = tag && { className };

  return (
    <Tag {...tagProps}>
      {getText(id, values, locale)}
    </Tag>
  );
};

export default memo(withText(Text));
