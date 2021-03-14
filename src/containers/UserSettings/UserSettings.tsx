import React from 'react';
import { useSelector } from 'react-redux';
import UserSettingsForm from './UserSettingsForm';
import { getSessionUser, getSessionUseRoles } from '../../state/session/sessionStateGetters';

const UserSettings: React.FC = () => {
  const { name, role, isObserver, avatarId } = useSelector(getSessionUser);
  const useRoles = useSelector(getSessionUseRoles);
  const initialValues = { name, role: useRoles ? role : '', avatarId };

  return (
    <div>
      <UserSettingsForm
        initialValues={initialValues}
        isObserver={isObserver}
        useRoles={useRoles}
      />
    </div>
  );
};

export default UserSettings;
