import React from 'react';
import { User } from '../../../types/global';
import Avatar, { AvatarId } from '../../../components/Avatar';
import Button from '../../../components/Button';

type Props = {
  onSelect: (params: Partial<User>) => void;
  value: AvatarId;
}

const AvatarSelector: React.FC<Props> = (props) => {
  const { onSelect, value } = props;
  const getStyle = (id: AvatarId) =>
    ({ ...(value === id && { border: '2px solid rosybrown' }) });

  return (
    <div>
      {Object.values(AvatarId).map((avatarId) => (
        <Button
          style={getStyle(avatarId)}
          key={avatarId}
          onClick={() => onSelect({ avatarId })}
        >
          <Avatar id={avatarId} />
        </Button>
      ))}
    </div>
  );
};

export default AvatarSelector;
