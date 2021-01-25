import React, { memo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { MessageId } from '../../lang';
import { getText, mapLocaleToProps } from './utils';

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps & {
  className?: string;
  id: MessageId;
  values?: Record<string, string>;
  tag?: keyof HTMLElementTagNameMap;
}

const Text: React.FC<Props> = (props) => {
  const { className, id, values, tag, locale } = props;

  const Tag = tag ? ({ children: c, className: cl }) =>
    React.createElement(tag, { className: cl }, c) : React.Fragment;

  const tagProps = tag && { className };

  return (
    <Tag {...tagProps}>
      {getText(id, values, locale)}
    </Tag>
  );
};

const connector = connect(mapLocaleToProps);

export default connector(memo(Text));
