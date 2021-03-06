import React from 'react';
import { useSelector } from 'react-redux';
import {
  getSessionUserIsObserver,
  getSessionUserName,
  getSessionUseRoles,
  getSessionUserRole
} from 'state/session/sessionStateGetters';
import { modifySessionUser } from 'state/session/sessionActions';
import { wsModifySessionUser } from 'state/ws/wsActions';
import { useMappedDispatch, useText } from 'utils/customHooks';
import ThemeSelector from 'containers/ThemeSelector';
import Button from 'components/Button';
import { setAppSidebarOpen } from 'state/app/appActions';
import UserSettingsForm from './UserSettingsForm';

type Actions = {
  modifyUser: typeof modifySessionUser;
  setSidebarOpen: typeof setAppSidebarOpen;
}

const actions = {
  modifyUser: [modifySessionUser, wsModifySessionUser],
  setSidebarOpen: setAppSidebarOpen,
} as unknown as Actions;

type Props = {
  withForm?: boolean;
}

const UserSettings: React.FC<Props> = ({ withForm }) => {
  const { modifyUser, setSidebarOpen } = useMappedDispatch(actions);
  const name = useSelector(getSessionUserName);
  const role = useSelector(getSessionUserRole);
  const isObserver = useSelector(getSessionUserIsObserver);
  const useRoles = useSelector(getSessionUseRoles);
  const text = useText();
  const initialValues = { name, role: useRoles ? role : '' };

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
      <ThemeSelector />
      <Button onClick={() => setSidebarOpen(false)}>{text('global.done')}</Button>
    </div>
  );
};

export default UserSettings;
