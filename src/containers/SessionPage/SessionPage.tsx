import React, { useEffect } from 'react';
import { RouteChildrenProps } from 'react-router';
import { useSelector } from 'react-redux';
import VoteRound from 'containers/VoteRound';
import {
  closeSession as closeSessionAction,
  loadSession as loadSessionAction
} from 'state/session/sessionActions';
import { clearVoteRoundState as clearVoteRoundStateAction } from 'state/voteRound/voteRoundActions';
import { getSessionCurrentId } from 'state/session/sessionStateGetters';
import { useMappedDispatch } from 'utils/customHooks';

const actions = {
  loadSession: loadSessionAction,
  closeSession: closeSessionAction,
  clearVoteRoundState: clearVoteRoundStateAction,
};

type Props = RouteChildrenProps<{ sessionId: string }>;

const SessionPage: React.FC<Props> = (props) => {
  const { match: { params: { sessionId } } } = props;
  const currentSessionId = useSelector(getSessionCurrentId);
  const { loadSession, clearVoteRoundState, closeSession } = useMappedDispatch(actions);

  useEffect(() => {
    loadSession(sessionId);

    return () => {
      closeSession(sessionId);
      clearVoteRoundState();
    };
  }, []);

  if (!currentSessionId) {
    return <span>Loading...</span>;
  }

  return (
    <div>
      <VoteRound />
    </div>
  );
};

export default SessionPage;
