import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteChildrenProps } from 'react-router';
import CreateSessionForm from '../CreateSessionForm';
import { CreateSessionFormData } from '../CreateSessionForm/CreateSessionForm';
import { State } from '../../types/global';
import { startSessionValidationSchema } from '../CreateSessionForm/validationSchema';
import { startSession as startSessionAction } from '../../state/session/sessionActions';
import PointValuesForm from '../PointValuesForm';

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
    <div>
      <CreateSessionForm
        initialValues={initialValues}
        onSubmit={startSession}
        validationSchema={startSessionValidationSchema}
      />
      <div style={{ height: 40 }} />
      <PointValuesForm />
    </div>
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(StartSessionPage);
