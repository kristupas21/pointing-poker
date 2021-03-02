import React from 'react';
import { useSelector } from 'react-redux';
import { RouteChildrenProps } from 'react-router';
import CreateSessionForm from '../CreateSessionForm';
import { startSessionValidationSchema } from '../CreateSessionForm/validationSchema';
import { startSession as startSessionAction } from '../../state/session/sessionActions';
import PointValuesForm from '../PointValuesForm';
import RolesForm from '../RolesForm';
import { removeEmptyRoles } from '../../state/session/sessionUtils';
import { getSessionState } from '../../state/session/sessionStateGetters';
import { useMappedDispatch } from '../../utils/customHooks';
import { CreateSessionFormData } from '../CreateSessionForm/types';

const mapDispatchToProps = {
  startSession: startSessionAction,
};

type Props = RouteChildrenProps

const StartSessionPage: React.FC<Props> = () => {
  const { user, useRoles, roles } = useSelector(getSessionState);
  const { startSession } = useMappedDispatch(mapDispatchToProps);
  const userRoles = removeEmptyRoles(roles);

  const initialValues: CreateSessionFormData = {
    name: user?.name || '',
    role: useRoles ? (user?.role || '') : '',
    isObserver: user?.isObserver || false,
    useRoles,
  };

  return (
    <div>
      <CreateSessionForm
        initialValues={initialValues}
        onSubmit={startSession}
        validationSchema={startSessionValidationSchema}
        roles={userRoles}
      />
      <div style={{ height: 40 }} />
      <PointValuesForm />
      <div style={{ height: 40 }} />
      <RolesForm />
    </div>
  );
};

export default StartSessionPage;
