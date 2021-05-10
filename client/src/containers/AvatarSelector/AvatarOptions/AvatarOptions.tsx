import React from 'react';
import { useSelector } from 'react-redux';
import { User } from 'globalTypes';
import Avatar, { AvatarId, getCommonAvatarValues } from 'components/Avatar';
import classNames from 'classnames/bind';
import Button from 'components/Button';
import { getAppHiddenFeatsUnlocked } from 'state/app/appStateGetters';
import Icon, { IconId } from 'components/Icon';
import styles from '../AvatarSelector.module.scss';

const cx = classNames.bind(styles);
const AVATARS = Object.values(AvatarId);

type Props = {
  onSelect: (params: Partial<User>) => void;
  value: AvatarId;
}

const AvatarOptions: React.FC<Props> = (props) => {
  const { onSelect, value } = props;
  const hiddenFeatsUnlocked = useSelector(getAppHiddenFeatsUnlocked);
  const avatars = (hiddenFeatsUnlocked)
    ? AVATARS
    : AVATARS.filter(getCommonAvatarValues);

  return (
    <div className={cx('avatar-selector__options')}>
      {avatars.map((avatarId) => (
        <Button
          key={avatarId}
          onClick={() => onSelect({ avatarId })}
          className={cx('avatar-selector__option')}
        >
          <Avatar id={avatarId} className={cx('avatar-selector__avatar')} />
          {value === avatarId && (
            <div className={cx('avatar-selector__selected-indicator')}>
              <Icon width={9} id={IconId.CheckmarkSmall} />
            </div>
          )}
        </Button>
      ))}
    </div>
  );
};

export default AvatarOptions;
