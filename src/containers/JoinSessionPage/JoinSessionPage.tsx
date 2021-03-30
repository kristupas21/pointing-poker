import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import omit from 'lodash/omit';
import { RouteChildrenProps } from 'react-router';
import {
  joinSession as joinSessionAction,
  resetSessionState as resetSessionStateAction,
  setSessionParams as setSessionParamsAction
} from 'state/session/sessionActions';
import { useMappedDispatch, useSessionId } from 'utils/customHooks';
import { getNormalizedSessionRoles, getSessionState } from 'state/session/sessionStateGetters';
import { SessionFormData } from 'containers/SessionForms/types';
import storageService from 'utils/storageService/storageService';
import { StorageKey } from 'utils/storageService';
import JoinSessionForm from 'containers/SessionForms/JoinSessionForm';
import { SubmitHandler } from 'components/Form';

const actions = {
  joinSession: joinSessionAction,
  setSessionParams: setSessionParamsAction,
  resetSessionState: resetSessionStateAction,
};

type Props = RouteChildrenProps;

const JoinSessionPage: React.FC<Props> = () => {
  const { user, useRoles, currentSessionId } = useSelector(getSessionState);
  const roles = useSelector(getNormalizedSessionRoles);
  const { joinSession, setSessionParams, resetSessionState } = useMappedDispatch(actions);
  const sessionIdFromLocationState = useSessionId();

  const handleSubmit: SubmitHandler<SessionFormData> = (values, { setSubmitting }) => {
    joinSession(omit(values, 'useRoles'), setSubmitting);
  };

  const storageValues = storageService.get<SessionFormData>(StorageKey.FormValues);

  const initialSessionId =
      storageValues?.sessionId ||
      currentSessionId ||
      sessionIdFromLocationState || '';

  const initialIsObserver = () => (storageValues?.isObserver != null
    ? storageValues.isObserver
    : user?.isObserver || false);

  const initialValues: SessionFormData = {
    sessionId: initialSessionId,
    role: storageValues?.role || user?.role || '',
    isObserver: initialIsObserver(),
    name: storageValues?.name || user?.name || '',
    useRoles,
  };

  useEffect(() => {
    storageService.remove(StorageKey.FormErrors);
    storageService.remove(StorageKey.FormValues);
    resetSessionState();

    return () => {
      setSessionParams({ currentSessionId: null });
      storageService.remove(StorageKey.FormErrors);
      storageService.remove(StorageKey.FormValues);
    };
  }, []);

  return (
    <JoinSessionForm
      onSubmit={handleSubmit}
      roles={roles}
      initialValues={initialValues}
    />
  );
};

export default JoinSessionPage;
