import React from 'react';
import { useSelector } from 'react-redux';
import { getSessionUser, getSessionUseRoles } from 'state/session/sessionStateGetters';
import { modifySessionUser } from 'state/session/sessionActions';
import { wsModifySessionUser } from 'state/ws/wsActions';
import { useMappedDispatch } from 'utils/customHooks';
import UserSettingsForm from './UserSettingsForm';
import AvatarSelector from './AvatarSelector';

const actions = {
  modifyUser: [modifySessionUser, wsModifySessionUser],
};

type A = {
  modifyUser: typeof modifySessionUser;
}

const UserSettings: React.FC = () => {
  const { modifyUser } = useMappedDispatch<A>(actions as unknown as A);
  const { name, role, isObserver, avatarId } = useSelector(getSessionUser);
  const useRoles = useSelector(getSessionUseRoles);
  const initialValues = { name, role: useRoles ? role : '' };

  return (
    <div>
      <UserSettingsForm
        initialValues={initialValues}
        isObserver={isObserver}
        useRoles={useRoles}
        submitField={modifyUser}
      />
      <AvatarSelector onSelect={modifyUser} value={avatarId} />
    </div>
  );
};

export default UserSettings;
