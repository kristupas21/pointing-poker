import React from 'react';
import { useText } from 'utils/customHooks';
import { MessageId } from 'lang';

type Props = {
  message: MessageId;
}

const BaseMessage: React.FC<Props> = (props) => {
  const { message } = props;
  const text = useText();

  return (
    <span>
      {text(message)}
    </span>
  );
};

export default BaseMessage;
