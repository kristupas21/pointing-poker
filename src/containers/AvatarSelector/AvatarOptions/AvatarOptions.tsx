import React from 'react';
import { User } from 'globalTypes';
import Avatar, { AvatarId } from 'components/Avatar';
import Button, { ButtonVariant } from 'components/Button';

type Props = {
  onSelect: (params: Partial<User>) => void;
  value: AvatarId;
}

const AvatarOptions: React.FC<Props> = (props) => {
  const { onSelect, value } = props;
  const _getStyle = (id: AvatarId) =>
    ({ ...(value === id && { background: 'rgba(0, 0, 0, .3)' }) });

  return (
    <div>
      {Object.values(AvatarId).map((avatarId) => (
        <Button
          style={_getStyle(avatarId)}
          key={avatarId}
          onClick={() => onSelect({ avatarId })}
          variant={ButtonVariant.None}
        >
          <Avatar id={avatarId} />
        </Button>
      ))}
    </div>
  );
};

export default AvatarOptions;
