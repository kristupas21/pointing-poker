import React, { useEffect } from 'react';
import { RouteChildrenProps } from 'react-router';
import { connect, ConnectedProps } from 'react-redux';
import VoteRound from '../VoteRound';
import { loadSession as loadSessionAction, closeSession } from '../../state/session/sessionActions';
import { State } from '../../types/global';
import Button from '../../components/Button';
import Text from '../../components/Text';
import { copyToClipboard } from '../../utils/commands';
import { clearVoteRoundState } from '../../state/voteRound/voteRoundActions';

const mapStateToProps = (state: State) => ({
  currentSessionId: state.session.currentSessionId,
});

const mapDispatchToProps = (dispatch) => ({
  loadSession: (id: string) => dispatch(loadSessionAction(id)),
  clearSession: (id: string) => {
    dispatch(closeSession(id));
    dispatch(clearVoteRoundState());
  },
});

type ReduxProps = ConnectedProps<typeof connector>;
type Props = RouteChildrenProps<{ sessionId: string }> & ReduxProps;

const SessionPage: React.FC<Props> = (props) => {
  const { match: { params: { sessionId } }, currentSessionId, clearSession, loadSession } = props;

  useEffect(() => {
    loadSession(sessionId);

    return () => clearSession(sessionId);
  }, []);

  if (!currentSessionId) {
    return null;
  }

  return (
    <div>
      {sessionId}
      <Button onClick={() => copyToClipboard(currentSessionId)}>
        <Text id="global.copy" />
      </Button>
      <VoteRound />
    </div>
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(SessionPage);
