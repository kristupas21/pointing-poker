import React from 'react';
import { RouteChildrenProps } from 'react-router';
import { connect, ConnectedProps } from 'react-redux';
import VoteRound from '../VoteRound';
import { loadSession as loadSessionAction } from '../../state/session/sessionActions';
import { State } from '../../types/global';

const mapStateToProps = (state: State) => ({
  currentSessionId: state.session.currentSessionId,
});

const mapDispatchToProps = {
  loadSession: loadSessionAction,
};

type ReduxProps = ConnectedProps<typeof connector>;

type Props = RouteChildrenProps<{ sessionId: string }> & ReduxProps;

class SessionPage extends React.Component<Props> {
  public componentDidMount() {
    const { match: { params: { sessionId } }, loadSession } = this.props;

    loadSession(sessionId);
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
