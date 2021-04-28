import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import omit from 'lodash/omit';
import { RouteChildrenProps } from 'react-router';
import {
  resetSessionState as resetSessionStateAction,
  startSession as startSessionAction
} from 'state/session/sessionActions';
import PointValuesForm from 'containers/PointValuesForm';
import RolesForm from 'containers/RolesForm';
import {
  getSessionUsePermissions,
  getSessionUser,
  getSessionUseRoles
} from 'state/session/sessionStateGetters';
import { useMappedDispatch } from 'utils/customHooks';
import { SessionFormData } from '../SessionForms/types';
import FormWrapper from '../SessionForms/StartSessionForm';

const actions = {
  startSession: startSessionAction,
  resetSessionState: resetSessionStateAction,
};

type Props = RouteChildrenProps

const StartSessionPage: React.FC<Props> = () => {
  const user = useSelector(getSessionUser);
  const useRoles = useSelector(getSessionUseRoles);
  const usePermissions = useSelector(getSessionUsePermissions);
  const { startSession, resetSessionState } = useMappedDispatch(actions);

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

  useEffect(() => {
    resetSessionState();

    return () => resetSessionState();
  }, []);

  return (
    <div>
      <FormWrapper
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />
      <PointValuesForm />
      <RolesForm />
    </div>
  );
};

export default StartSessionPage;
