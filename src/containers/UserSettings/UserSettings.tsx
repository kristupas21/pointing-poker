import React from 'react';
import { useSelector } from 'react-redux';
import {
  getSessionUserAvatarId,
  getSessionUserIsObserver,
  getSessionUserName,
  getSessionUseRoles,
  getSessionUserRole
} from 'state/session/sessionStateGetters';
import { modifySessionUser } from 'state/session/sessionActions';
import { wsModifySessionUser } from 'state/ws/wsActions';
import { useMappedDispatch, useText } from 'utils/customHooks';
import ThemeSelector from 'containers/ThemeSelector';
import AvatarSelector from 'containers/AvatarSelector';
import Button from 'components/Button';
import { setAppSidebarOpen } from 'state/app/appActions';
import UserSettingsForm from './UserSettingsForm';

const actions = {
  modifyUser: [modifySessionUser, wsModifySessionUser],
  setSidebarOpen: setAppSidebarOpen,
};

type A = {
  modifyUser: typeof modifySessionUser;
  setSidebarOpen: typeof setAppSidebarOpen;
}

type Props = {
  withForm?: boolean;
}

const UserSettings: React.FC<Props> = ({ withForm }) => {
  const { modifyUser, setSidebarOpen } = useMappedDispatch<A>(actions as unknown as A);
  const name = useSelector(getSessionUserName);
  const role = useSelector(getSessionUserRole);
  const isObserver = useSelector(getSessionUserIsObserver);
  const avatarId = useSelector(getSessionUserAvatarId);
  const useRoles = useSelector(getSessionUseRoles);
  const text = useText();
  const initialValues = { name, role: useRoles ? role?.id : '' };

  return (
    <div>
      {withForm && (
        <UserSettingsForm
          initialValues={initialValues}
          isObserver={isObserver}
          useRoles={useRoles}
          submitField={modifyUser}
        />
      )}
      <AvatarSelector onSelect={modifyUser} value={avatarId} />
      <ThemeSelector />
      <Button onClick={() => setSidebarOpen(false)}>{text('global.done')}</Button>
    </div>
  );
};

export default UserSettings;
