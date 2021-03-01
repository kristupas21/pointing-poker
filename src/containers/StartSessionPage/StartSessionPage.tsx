import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteChildrenProps } from 'react-router';
import CreateSessionForm from '../CreateSessionForm';
import { CreateSessionFormData } from '../CreateSessionForm/CreateSessionForm';
import { State } from '../../types/global';
import { startSessionValidationSchema } from '../CreateSessionForm/validationSchema';
import { startSession as startSessionAction } from '../../state/session/sessionActions';
import PointValuesForm from '../PointValuesForm';
import RolesForm from '../RolesForm';
import { removeEmptyRoles } from '../../state/session/sessionUtils';

const mapStateToProps = (state: State) => ({
  useRoles: state.session.useRoles,
  user: state.session.user,
  roles: state.session.roles,
});

const mapDispatchToProps = {
  startSession: startSessionAction,
};

type ReduxProps = ConnectedProps<typeof connector>;
type Props = RouteChildrenProps & ReduxProps;

const StartSessionPage: React.FC<Props> = (props) => {
  const { user, useRoles, startSession, roles } = props;
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

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(StartSessionPage);
