import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteChildrenProps } from 'react-router';
import CreateSessionForm from '../CreateSessionForm';
import { CreateSessionFormData } from '../CreateSessionForm/CreateSessionForm';
import { State } from '../../types/global';
import { joinSessionValidationSchema } from '../CreateSessionForm/validationSchema';
import { joinSession as joinSessionAction, setSessionParams } from '../../state/session/sessionActions';
import { useSessionId } from '../../utils/customHooks';

const mapStateToProps = (state: State) => ({
  currentSessionId: state.session.currentSessionId,
  useRoles: state.session.useRoles,
  user: state.session.user,
});

const mapDispatchToProps = (dispatch) => ({
  joinSession: (v) => dispatch(joinSessionAction(v)),
  clearSessionParams: () => dispatch(setSessionParams(null, false)),
});

type ReduxProps = ConnectedProps<typeof connector>;

type Props = RouteChildrenProps & ReduxProps;

const JoinSessionPage: React.FC<Props> = (props) => {
  const { user, useRoles, joinSession, currentSessionId, clearSessionParams } = props;
  const sessionIdFromLocationState = useSessionId();

  const initialValues: CreateSessionFormData = {
    sessionId: currentSessionId || sessionIdFromLocationState || '',
    name: user?.name || '',
    role: useRoles ? (user?.role || '') : '',
    isObserver: user?.isObserver || false,
    useRoles,
  };

  useEffect(() => () => clearSessionParams(), []);

  return (
    <CreateSessionForm
      isJoinType
      initialValues={initialValues}
      onSubmit={joinSession}
      validationSchema={joinSessionValidationSchema}
    />
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(JoinSessionPage);
