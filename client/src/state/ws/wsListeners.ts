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
import { pushNotification } from 'state/notifications/notificationsActions';
import renderNotification, { NotificationContent } from 'utils/notificationContent';
import { getVotesShownValue, getVoteValueByIdStateGetter } from 'state/voteRound/voteRoundStateGetters';
import { setSessionParams } from 'state/session/sessionActions';
import { getSessionUserId } from 'state/session/sessionStateGetters';
import { throwAppError } from 'state/error/errorActions';
import { AppError } from 'utils/errorParser/types';
import { ERROR_CODES } from 'utils/errorParser';
import { MessageId } from 'lang';
import {
  WSMessageSessionPermissions,
  WSMessageSetTopic,
  WSMessageSetVoteValue,
  WSMessageUserData,
  WSMessageUserPermissions
} from './wsModel';

export function* socketErrorListener(e: AppError) {
  const code = e?.code || ERROR_CODES.UNEXPECTED as MessageId;

  yield put(throwAppError(code, e?.payload));
}

export function* userJoinedListener(message: WSMessageUserData) {
  yield put(addUserToVoteRound(message.body.user));
}

export function* userLeftListener(message: WSMessageUserData) {
  const { user } = message.body;
  const notification = renderNotification(NotificationContent.UserLeft, user);

  yield put(removeUserFromVoteRound(user.id));
  yield put(pushNotification(notification));
}

export function* showVotesListener(message: WSMessageUserData) {
  const { user } = message.body;
  const notification = renderNotification(NotificationContent.UserShowVotes, user);

  yield put(showVotes());
  yield put(pushNotification(notification));
}

export function* hideVotesListener() {
  yield put(hideVotes());
}

export function* resetVoteRoundListener(message: WSMessageUserData) {
  const { user } = message.body;
  const notification = renderNotification(NotificationContent.UserResetRound, user);

  yield put(resetVoteRound());
  yield put(pushNotification(notification));
}

export function* setVoteValueListener(message: WSMessageSetVoteValue) {
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

export function* setVoteRoundTopicListener(message: WSMessageSetTopic) {
  yield put(setVoteRoundTopic(message.body.topic));
}

export function* modifySessionUserListener(message: WSMessageUserData) {
  yield put(addUserToVoteRound(message.body.user));
}

export function* updateSessionPermissionsListener(message: WSMessageSessionPermissions) {
  yield put(setSessionParams({ usePermissions: message.body.usePermissions }));
}

export function* updateVoteRoundUserPermissionsListener(message: WSMessageUserPermissions) {
  const userId = yield select(getSessionUserId);

  yield put(updateVoteRoundUserPermissions(userId, message.body.hasPermission));
}
