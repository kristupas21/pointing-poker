import React from 'react';
import { useSelector } from 'react-redux';
import { RouteChildrenProps } from 'react-router';
import SessionForm from 'containers/SessionForm';
import { startSessionValidationSchema } from 'containers/SessionForm/validationSchema';
import { startSession as startSessionAction } from 'state/session/sessionActions';
import PointValuesForm from 'containers/PointValuesForm';
import RolesForm from 'containers/RolesForm';
import { removeEmptyRoles } from 'state/session/sessionUtils';
import { getSessionState } from 'state/session/sessionStateGetters';
import { useMappedDispatch } from 'utils/customHooks';
import { SessionFormData } from 'containers/SessionForm/types';

const actions = {
  startSession: startSessionAction,
};

type Props = RouteChildrenProps

const StartSessionPage: React.FC<Props> = () => {
  const { user, roles } = useSelector(getSessionState);
  const { startSession } = useMappedDispatch(actions);
  const userRoles = removeEmptyRoles(roles);

  const initialValues: SessionFormData = {
    name: user?.name || '',
    role: user?.role || '',
    isObserver: user?.isObserver || false,
    useRoles: true,
  };

  return (
    <div>
      <SessionForm
        initialValues={initialValues}
        onSubmit={startSession}
        validationSchema={startSessionValidationSchema}
        roles={userRoles}
      />
      <PointValuesForm />
      <RolesForm />
    </div>
  );
};

export default StartSessionPage;
