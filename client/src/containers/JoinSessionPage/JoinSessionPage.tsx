import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import omit from 'lodash/omit';
import { RouteChildrenProps } from 'react-router';
import {
  joinSession as joinSessionAction,
  resetSessionState as resetSessionStateAction,
} from 'state/session/sessionActions';
import { useMappedDispatch, useSessionId } from 'utils/customHooks';
import { getSessionState } from 'state/session/sessionStateGetters';
import { SessionFormData } from 'containers/SessionForms/types';
import FormWrapper from 'containers/SessionForms/JoinSessionForm';
import { SubmitHandler } from 'utils/form/types';

const actions = {
  joinSession: joinSessionAction,
  resetSessionState: resetSessionStateAction,
};

type Props = RouteChildrenProps;

const JoinSessionPage: React.FC<Props> = () => {
  const { user, useRoles, currentSessionId } = useSelector(getSessionState);
  const sessionIdFromLocationState = useSessionId();

  const {
    joinSession,
    resetSessionState,
  } = useMappedDispatch(actions);

  const handleSubmit: SubmitHandler<SessionFormData> = (
    values,
    { setSubmitting, setFieldValue, setFieldError }
  ) => {
    joinSession(
      omit(values, 'useRoles'),
      { setSubmitting, setFieldValue, setFieldError }
    );
  };

  const initialValues: SessionFormData = {
    sessionId: currentSessionId || sessionIdFromLocationState || '',
    role: user?.role || '',
    isObserver: user?.isObserver || false,
    name: user?.name || '',
    useRoles,
  };

  useEffect(() => {
    resetSessionState();

    return () => resetSessionState();
  }, []);

  return (
    <FormWrapper
      onSubmit={handleSubmit}
      initialValues={initialValues}
    />
  );
};

export default JoinSessionPage;
