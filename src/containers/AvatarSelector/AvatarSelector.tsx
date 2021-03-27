import React from 'react';
import { User } from 'globalTypes';
import Avatar, { AvatarId } from 'components/Avatar';
import Button, { ButtonVariant } from 'components/Button';
import { useText } from 'utils/customHooks';

type Props = {
  onSelect: (params: Partial<User>) => void;
  value: AvatarId;
}

const AvatarSelector: React.FC<Props> = (props) => {
  const { onSelect, value } = props;
  const text = useText();
  const _getStyle = (id: AvatarId) =>
    ({ ...(value === id && { border: '2px solid var(--app-mainColor)' }) });

  return (
    <div>
      <h4>{text('settings.avatar.title')}</h4>
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

export default AvatarSelector;
