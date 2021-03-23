import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import omit from 'lodash/omit';
import { RouteChildrenProps } from 'react-router';
import SessionForm from 'containers/SessionForm';
import { joinSessionValidationSchema } from 'containers/SessionForm/validationSchema';
import {
  joinSession as joinSessionAction,
  setSessionParams as setSessionParamsAction
} from 'state/session/sessionActions';
import { useMappedDispatch, useSessionId } from 'utils/customHooks';
import { removeEmptyRoles } from 'state/session/sessionUtils';
import { getSessionState } from 'state/session/sessionStateGetters';
import { SessionFormData } from 'containers/SessionForm/types';

const actions = {
  joinSession: joinSessionAction,
  setSessionParams: setSessionParamsAction,
};

type Props = RouteChildrenProps;

const JoinSessionPage: React.FC<Props> = () => {
  const { user, useRoles, currentSessionId, roles } = useSelector(getSessionState);
  const { joinSession, setSessionParams } = useMappedDispatch(actions);
  const sessionIdFromLocationState = useSessionId();
  const userRoles = removeEmptyRoles(roles);

  const handleSubmit: typeof joinSessionAction = (values, sfe, ss) =>
    joinSession(omit(values, 'useRoles'), sfe, ss);

  const initialValues: SessionFormData = {
    sessionId: currentSessionId || sessionIdFromLocationState || '',
    name: user?.name || '',
    role: user?.role?.id || '',
    isObserver: user?.isObserver || false,
    useRoles,
  };

  useEffect(() => () => setSessionParams({ currentSessionId: null }), []);

  return (
    <SessionForm
      isJoinType
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={joinSessionValidationSchema}
      roles={userRoles}
    />
  );
};

export default JoinSessionPage;
