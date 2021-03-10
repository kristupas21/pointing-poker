import React from 'react';
import classNames from 'classnames/bind';
import { useText } from 'utils/customHooks';
import styles from './UserLeft.module.scss';

const cx = classNames.bind(styles);

type Props = { name: string; }

const UserLeft: React.FC<Props> = ({ name }) => {
  const text = useText();

  return (
    <span>
      <span className={cx('name')}>{name}</span>
      {text('notifications.userLeft')}
    </span>
  );
};

export default UserLeft;
