import { put, select } from 'redux-saga/effects';
import {
  addUserToVoteRound,
  hideVotes,
  removeUserFromVoteRound,
  resetVoteRound,
  setUserVoteValue,
  setVoteRoundTopic,
  showVotes, updateVoteRoundUserPermissions
} from 'state/voteRound/voteRoundActions';
import { User } from 'globalTypes';
import { pushNotification } from 'state/notifications/notificationsActions';
import renderNotification, { NotificationContent } from 'utils/notificationContent';
import { WSMessage } from './wsModel';
import { getVotesShownValue, getVoteValueByIdStateGetter } from '../voteRound/voteRoundStateGetters';
import { setSessionParams } from '../session/sessionActions';
import { getSessionUserId } from '../session/sessionStateGetters';

export function* userJoinedListener(message: WSMessage<{ user: User }>) {
  yield put(addUserToVoteRound(message.body.user));
}

export function* userLeftListener(message: WSMessage<{ user: User }>) {
  const { user } = message.body;
  const notification = renderNotification(NotificationContent.UserLeft, user);

  yield put(removeUserFromVoteRound(user.id));
  yield put(pushNotification(notification));
}

export function* showVotesListener(message: WSMessage<{ user: User }>) {
  const { user } = message.body;
  const notification = renderNotification(NotificationContent.UserShowVotes, user);

  yield put(showVotes());
  yield put(pushNotification(notification));
}

export function* hideVotesListener() {
  yield put(hideVotes());
}

export function* resetVoteRoundListener(message: WSMessage<{ user: User }>) {
  const { user } = message.body;
  const notification = renderNotification(NotificationContent.UserResetRound, user);

  yield put(resetVoteRound());
  yield put(pushNotification(notification));
}

export function* setVoteValueListener(message: WSMessage<{ user: User, voteValue: string }>) {
  const { user, voteValue } = message.body;

  yield put(setUserVoteValue(user, voteValue));

  const votesShown = yield select(getVotesShownValue);
  const userCurrentVote = yield select(getVoteValueByIdStateGetter(user.id));

  if (votesShown && userCurrentVote != null) {
    yield put(
      pushNotification(
        renderNotification(NotificationContent.UserChangeVote, user)
      )
    );
  }
}

export function* setVoteRoundTopicListener(message: WSMessage<{ topic: string }>) {
  yield put(setVoteRoundTopic(message.body.topic));
}

export function* modifySessionUserListener(message: WSMessage<{ user: User }>) {
  yield put(addUserToVoteRound(message.body.user));
}

export function* updateSessionPermissionsListener(message: WSMessage<{ usePermissions: boolean }>) {
  yield put(setSessionParams({ usePermissions: message.body.usePermissions }));
}

export function* updateVoteRoundUserPermissionsListener(
  message: WSMessage<{ sessionControlPermission: boolean }>
) {
  const userId = yield select(getSessionUserId);

  yield put(updateVoteRoundUserPermissions(userId, message.body.sessionControlPermission));
}
