import React from 'react';
import { useSelector } from 'react-redux';
import omit from 'lodash/omit';
import { RouteChildrenProps } from 'react-router';
import { startSession as startSessionAction } from 'state/session/sessionActions';
import PointValuesForm from 'containers/PointValuesForm';
import RolesForm from 'containers/RolesForm';
import {
  getNormalizedSessionRoles,
  getSessionUsePermissions,
  getSessionUser,
  getSessionUseRoles
} from 'state/session/sessionStateGetters';
import { useMappedDispatch } from 'utils/customHooks';
import { SessionFormData } from '../SessionForms/types';
import StartSessionForm from '../SessionForms/StartSessionForm';

const actions = {
  startSession: startSessionAction,
};

type Props = RouteChildrenProps

const StartSessionPage: React.FC<Props> = () => {
  const user = useSelector(getSessionUser);
  const useRoles = useSelector(getSessionUseRoles);
  const usePermissions = useSelector(getSessionUsePermissions);
  const roles = useSelector(getNormalizedSessionRoles);
  const { startSession } = useMappedDispatch(actions);

  const handleSubmit = (values: SessionFormData) => {
    startSession(omit(values, 'sessionId'));
  };

  const initialValues: SessionFormData = {
    name: user?.name || '',
    role: user?.role || '',
    isObserver: user?.isObserver || false,
    useRoles,
    usePermissions,
  };

  return (
    <div>
      <StartSessionForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        roles={roles}
      />
      <PointValuesForm />
      <RolesForm />
    </div>
  );
};

export default StartSessionPage;
