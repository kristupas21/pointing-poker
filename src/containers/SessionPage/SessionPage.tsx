import React, { useEffect } from 'react';
import { RouteChildrenProps } from 'react-router';
import { useSelector } from 'react-redux';
import VoteRound from '../VoteRound';
import {
  loadSession as loadSessionAction,
  closeSession as closeSessionAction
} from '../../state/session/sessionActions';
import Button from '../../components/Button';
import Text from '../../components/Text';
import { copyToClipboard } from '../../utils/commands';
import { clearVoteRoundState as clearVoteRoundStateAction } from '../../state/voteRound/voteRoundActions';
import { getSessionCurrentId } from '../../state/session/sessionStateGetters';
import { useMappedDispatch } from '../../utils/customHooks';

const mapDispatchToProps = {
  loadSession: loadSessionAction,
  closeSession: closeSessionAction,
  clearVoteRoundState: clearVoteRoundStateAction,
};

type Props = RouteChildrenProps<{ sessionId: string }>;

const SessionPage: React.FC<Props> = (props) => {
  const { match: { params: { sessionId } } } = props;
  const currentSessionId = useSelector(getSessionCurrentId);
  const { loadSession, clearVoteRoundState, closeSession } = useMappedDispatch(mapDispatchToProps);

  useEffect(() => {
    loadSession(sessionId);

    return () => {
      closeSession(sessionId);
      clearVoteRoundState();
    };
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

export default SessionPage;
