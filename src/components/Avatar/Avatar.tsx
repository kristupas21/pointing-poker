import React, { memo } from 'react';
import classNames from 'classnames/bind';
import { AvatarId } from './types';
import { getAvatar } from './avatarMap';
import styles from './Avatar.module.scss';

const cx = classNames.bind(styles);

interface Props {
  id: AvatarId,
}

const Avatar: React.FC<Props> = (props) => {
  const { id } = props;
  const { Component, exists } = getAvatar(id);

  const avatarClasses = cx('avatar', {
    'avatar--invalid': !exists,
  });

  return (
    <span className={avatarClasses}>
      <Component />
    </span>
  );
};

export default memo(Avatar);
