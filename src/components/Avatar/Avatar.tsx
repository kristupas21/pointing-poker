import React, { memo } from 'react';
import classNames from 'classnames/bind';
import Icon from 'components/Icon';
import { AvatarId } from './types';
import { getAvatarIcon } from './utils';
import styles from './Avatar.module.scss';

const cx = classNames.bind(styles);

interface Props {
  id: AvatarId,
}

const Avatar: React.FC<Props> = (props) => {
  const { id } = props;
  const icon = getAvatarIcon(id);

  return (
    <span className={cx('avatar')}>
      <Icon id={icon} />
    </span>
  );
};

export default memo(Avatar);
