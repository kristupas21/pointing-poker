import React from 'react';
import classNames from 'classnames/bind';
import { useText } from 'utils/customHooks';
import styles from './UserMessage.module.scss';
import { MessageId } from '../../../../lang';

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
