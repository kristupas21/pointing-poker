import React from 'react';
import { useSelector } from 'react-redux';
import { User } from 'globalTypes';
import Avatar, { AvatarId, getCommonAvatarValues } from 'components/Avatar';
import Button from 'components/Button';
import { getAppHiddenFeatsUnlocked } from 'state/app/appStateGetters';

const AVATARS = Object.values(AvatarId);

type Props = {
  onSelect: (params: Partial<User>) => void;
  value: AvatarId;
}

const AvatarOptions: React.FC<Props> = (props) => {
  const { onSelect, value } = props;
  const hiddenFeatsUnlocked = useSelector(getAppHiddenFeatsUnlocked);
  const _getStyle = (id: AvatarId) =>
    ({ ...(value === id && { background: 'rgba(0, 0, 0, .3)' }) });
  const avatars = (hiddenFeatsUnlocked)
    ? AVATARS
    : AVATARS.filter(getCommonAvatarValues);

  return (
    <div>
      {avatars.map((avatarId) => (
        <Button
          style={_getStyle(avatarId)}
          key={avatarId}
          onClick={() => onSelect({ avatarId })}
        >
          <Avatar id={avatarId} />
        </Button>
      ))}
    </div>
  );
};

export default AvatarOptions;
