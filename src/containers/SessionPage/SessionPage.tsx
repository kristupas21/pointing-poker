import React from 'react';
import { RouteChildrenProps } from 'react-router';
import { connect, ConnectedProps } from 'react-redux';
import VoteRound from '../VoteRound';
import { loadSession as loadSessionAction, closeSession as closeSessionAction } from '../../state/session/sessionActions';
import { State } from '../../types/global';

const mapStateToProps = (state: State) => ({
  currentSessionId: state.session.currentSessionId,
});

const mapDispatchToProps = {
  loadSession: loadSessionAction,
  closeSession: closeSessionAction,
};

type ReduxProps = ConnectedProps<typeof connector>;

type Props = RouteChildrenProps<{ sessionId: string }> & ReduxProps;

class SessionPage extends React.Component<Props> {
  public componentDidMount() {
    const { match: { params: { sessionId } }, loadSession } = this.props;

    loadSession(sessionId);
  }

  public componentWillUnmount() {
    const { match: { params: { sessionId } }, closeSession } = this.props;

    closeSession(sessionId);
  }

  public render() {
    const { match: { params: { sessionId } }, currentSessionId } = this.props;

    if (!currentSessionId) {
      return null;
    }

    return (
      <div>
        {sessionId}
        <VoteRound />
      </div>
    );
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(SessionPage);
