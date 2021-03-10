import React, { useEffect } from 'react';
import { RouteChildrenProps } from 'react-router';
import { useSelector } from 'react-redux';
import VoteRound from 'containers/VoteRound';
import Button from 'components/Button';
import { copyToClipboard } from 'utils/commands';
import {
  closeSession as closeSessionAction,
  loadSession as loadSessionAction
} from 'state/session/sessionActions';
import { clearVoteRoundState as clearVoteRoundStateAction } from 'state/voteRound/voteRoundActions';
import { pushNotification as pushNotificationAction } from 'state/notifications/notificationsActions';
import { getSessionCurrentId } from 'state/session/sessionStateGetters';
import { useMappedDispatch, useText } from 'utils/customHooks';
import NFC, { NotificationContent } from 'utils/notificationContent';

const actions = {
  loadSession: loadSessionAction,
  closeSession: closeSessionAction,
  clearVoteRoundState: clearVoteRoundStateAction,
  pushNotification: pushNotificationAction,
};

type Props = RouteChildrenProps<{ sessionId: string }>;

const SessionPage: React.FC<Props> = (props) => {
  const { match: { params: { sessionId } } } = props;
  const currentSessionId = useSelector(getSessionCurrentId);
  const { loadSession, clearVoteRoundState, closeSession, pushNotification } = useMappedDispatch(actions);
  const text = useText();

  const handleCopyClick = () => {
    copyToClipboard(currentSessionId);
    pushNotification(NFC.render(NotificationContent.SessionCopy));
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
