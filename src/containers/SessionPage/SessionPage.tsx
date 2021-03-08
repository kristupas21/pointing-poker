import React, { useEffect } from 'react';
import { RouteChildrenProps } from 'react-router';
import { useSelector } from 'react-redux';
import VoteRound from '../VoteRound';
import {
  closeSession as closeSessionAction,
  loadSession as loadSessionAction
} from '../../state/session/sessionActions';
import Button from '../../components/Button';
import { copyToClipboard } from '../../utils/commands';
import { clearVoteRoundState as clearVoteRoundStateAction } from '../../state/voteRound/voteRoundActions';
import { getSessionCurrentId } from '../../state/session/sessionStateGetters';
import { useMappedDispatch, useText } from '../../utils/customHooks';
import { pushNotification as pushNotificationAction } from '../../state/notifications/notificationsActions';

const mapDispatchToProps = {
  loadSession: loadSessionAction,
  closeSession: closeSessionAction,
  clearVoteRoundState: clearVoteRoundStateAction,
  pushNotification: pushNotificationAction,
};

type Props = RouteChildrenProps<{ sessionId: string }>;

const SessionPage: React.FC<Props> = (props) => {
  const { match: { params: { sessionId } } } = props;
  const currentSessionId = useSelector(getSessionCurrentId);
  const { loadSession, clearVoteRoundState, closeSession, pushNotification } = useMappedDispatch(mapDispatchToProps);
  const text = useText();

  const handleCopyClick = () => {
    copyToClipboard(currentSessionId);

    pushNotification({
      id: 'COPY',
      text: 'session.idCopied',
    });
  };

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
      <Button onClick={handleCopyClick}>
        {text('global.copy')}
      </Button>
      <VoteRound />
    </div>
  );
};

export default SessionPage;
