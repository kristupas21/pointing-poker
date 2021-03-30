import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getSessionUserAvatarId } from 'state/session/sessionStateGetters';
import { modifySessionUser } from 'state/session/sessionActions';
import { useMappedDispatch } from 'utils/customHooks';
import Avatar from 'components/Avatar';
import Button, { ButtonVariant } from 'components/Button';
import Popover from 'components/Popover';
import { AlignType } from 'globalTypes';
import AvatarOptions from './AvatarOptions';

const actions = {
  modifyUser: modifySessionUser,
};

const AvatarSelector: React.FC = () => {
  const avatarId = useSelector(getSessionUserAvatarId);
  const { modifyUser } = useMappedDispatch(actions);
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const handleAvatarSelect = (params) => {
    modifyUser(params);
    setPopoverOpen(false);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      <Button
        onClick={() => setPopoverOpen(!isPopoverOpen)}
        variant={ButtonVariant.None}
      >
        <Avatar id={avatarId} />
      </Button>
      {isPopoverOpen && (
        <Popover onClose={() => setPopoverOpen(false)} align={AlignType.Right}>
          <AvatarOptions onSelect={handleAvatarSelect} value={avatarId} />
        </Popover>
      )}
    </div>
  );
};

export default AvatarSelector;
