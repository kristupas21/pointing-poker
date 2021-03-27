import React from 'react';
import classNames from 'classnames/bind';
import { useText } from 'utils/customHooks';
import { MessageId } from 'lang';
import styles from './UserMessage.module.scss';

const cx = classNames.bind(styles);

type Props = { name: string; message: MessageId; }

const UserMessage: React.FC<Props> = ({ name, message }) => {
  const text = useText();

  return (
    <span>
      <span className={cx('name')}>{name}</span>
      {text(message)}
    </span>
  );
};

export default UserMessage;
