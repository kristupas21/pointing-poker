import React from 'react';
import { useSelector } from 'react-redux';
import omit from 'lodash/omit';
import { RouteChildrenProps } from 'react-router';
import { startSession as startSessionAction } from 'state/session/sessionActions';
import PointValuesForm from 'containers/PointValuesForm';
import RolesForm from 'containers/RolesForm';
import { SubmitHandler } from 'components/Form';
import { getNormalizedSessionRoles, getSessionUser } from 'state/session/sessionStateGetters';
import { useMappedDispatch } from 'utils/customHooks';
import { SessionFormData } from '../SessionForms/types';
import StartSessionForm from '../SessionForms/StartSessionForm';

const actions = {
  startSession: startSessionAction,
};

type Props = RouteChildrenProps

const StartSessionPage: React.FC<Props> = () => {
  const user = useSelector(getSessionUser);
  const roles = useSelector(getNormalizedSessionRoles);
  const { startSession } = useMappedDispatch(actions);

  const handleSubmit: SubmitHandler<SessionFormData> = (values) => {
    startSession(omit(values, 'sessionId'));
  };

  const initialValues: SessionFormData = {
    name: user?.name || '',
    role: user?.role || '',
    isObserver: user?.isObserver || false,
    useRoles: true,
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
