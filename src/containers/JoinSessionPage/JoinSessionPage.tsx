import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RouteChildrenProps } from 'react-router';
import CreateSessionForm from '../CreateSessionForm';
import { CreateSessionFormData } from '../CreateSessionForm/CreateSessionForm';
import { joinSessionValidationSchema } from '../CreateSessionForm/validationSchema';
import {
  joinSession as joinSessionAction,
  setSessionParams as setSessionParamsAction
} from '../../state/session/sessionActions';
import { useMappedDispatch, useSessionId } from '../../utils/customHooks';
import { removeEmptyRoles } from '../../state/session/sessionUtils';
import { getSessionState } from '../../state/session/sessionStateGetters';

const mapDispatchToProps = {
  joinSession: joinSessionAction,
  setSessionParams: setSessionParamsAction,
};

type Props = RouteChildrenProps;

const JoinSessionPage: React.FC<Props> = () => {
  const { user, useRoles, currentSessionId, roles } = useSelector(getSessionState);
  const { joinSession, setSessionParams } = useMappedDispatch(mapDispatchToProps);
  const sessionIdFromLocationState = useSessionId();
  const userRoles = removeEmptyRoles(roles);

  const initialValues: CreateSessionFormData = {
    sessionId: currentSessionId || sessionIdFromLocationState || '',
    name: user?.name || '',
    role: useRoles ? (user?.role || '') : '',
    isObserver: user?.isObserver || false,
    useRoles,
  };

  useEffect(() => () => setSessionParams({ currentSessionId: null }), []);

  return (
    <CreateSessionForm
      isJoinType
      initialValues={initialValues}
      onSubmit={joinSession}
      validationSchema={joinSessionValidationSchema}
      roles={userRoles}
    />
  );
};

export default JoinSessionPage;
