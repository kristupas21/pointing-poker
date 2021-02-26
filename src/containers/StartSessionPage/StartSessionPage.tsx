import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteChildrenProps } from 'react-router';
import CreateSessionForm from '../CreateSessionForm';
import { CreateSessionFormData } from '../CreateSessionForm/CreateSessionForm';
import { State } from '../../types/global';
import { startSessionValidationSchema } from '../CreateSessionForm/validationSchema';
import { startSession as startSessionAction } from '../../state/session/sessionActions';

const mapStateToProps = (state: State) => ({
  useRoles: state.session.useRoles,
  user: state.session.user,
});

const mapDispatchToProps = {
  startSession: startSessionAction,
};

type ReduxProps = ConnectedProps<typeof connector>;

type Props = RouteChildrenProps & ReduxProps;

const StartSessionPage: React.FC<Props> = (props) => {
  const { user, useRoles, startSession } = props;

  const initialValues: CreateSessionFormData = {
    name: user?.name || '',
    role: user?.role || '',
    isObserver: user?.isObserver || false,
    useRoles,
  };

  return (
    <CreateSessionForm
      initialValues={initialValues}
      onSubmit={startSession}
      validationSchema={startSessionValidationSchema}
    />
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(StartSessionPage);
