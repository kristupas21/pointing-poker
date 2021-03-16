import React from 'react';
import classNames from 'classnames/bind';
import { useText } from 'utils/customHooks';
import styles from './UserPresence.module.scss';

const cx = classNames.bind(styles);

type Props = { name: string; hasLeft?: boolean; }

const UserPresence: React.FC<Props> = ({ name, hasLeft }) => {
  const text = useText();
  const textId = hasLeft ? 'notifications.userLeft' : 'notifications.userJoined';

  return (
    <span>
      <span className={cx('name')}>{name}</span>
      {text(textId)}
    </span>
  );
};

export default UserPresence;
