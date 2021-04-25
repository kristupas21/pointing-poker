import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getSessionUserAvatarId } from 'state/session/sessionStateGetters';
import { modifySessionUser } from 'state/session/sessionActions';
import { useMappedDispatch } from 'utils/customHooks';
import Avatar from 'components/Avatar';
import classNames from 'classnames/bind';
import Button from 'components/Button';
import Popover from 'components/Popover';
import { AlignType } from 'globalTypes';
import { wsModifySessionUser } from 'state/ws/wsActions';
import AvatarOptions from './AvatarOptions';
import styles from './AvatarSelector.module.scss';

const cx = classNames.bind(styles);

type Actions = {
  modifyUser: typeof modifySessionUser;
}

const actions = {
  modifyUser: [modifySessionUser, wsModifySessionUser],
} as unknown as Actions;

type Props = {
  className?: string;
}

const AvatarSelector: React.FC<Props> = (props) => {
  const { className } = props;
  const avatarId = useSelector(getSessionUserAvatarId);
  const { modifyUser } = useMappedDispatch(actions);
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const handleAvatarSelect = (params) => {
    modifyUser(params);
    setPopoverOpen(false);
  };

  return (
    <div className={cx('selector', className)}>
      <Button
        onClick={() => setPopoverOpen(!isPopoverOpen)}
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
