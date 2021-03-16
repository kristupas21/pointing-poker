import { put } from 'redux-saga/effects';
import {
  addUserToVoteRound,
  hideVotes,
  removeUserFromVoteRound,
  resetVoteRound,
  setUserVoteValue,
  setVoteRoundTopic,
  showVotes
} from 'state/voteRound/voteRoundActions';
import { User } from 'types/global';
import { pushNotification } from 'state/notifications/notificationsActions';
import renderNotification, { NotificationContent } from 'utils/notificationContent';
import { WSMessage } from './wsModel';

export function* userJoinedListener(message: WSMessage<{ user: User }>) {
  const { user } = message.body;
  const notification = renderNotification(NotificationContent.UserJoined, user);

  yield put(addUserToVoteRound(user));
  yield put(pushNotification(notification));
}

export function* userLeftListener(message: WSMessage<{ user: User }>) {
  const { user } = message.body;
  const notification = renderNotification(NotificationContent.UserLeft, user);

  yield put(removeUserFromVoteRound(user.id));
  yield put(pushNotification(notification));
}

export function* showVotesListener() {
  yield put(showVotes());
}

export function* hideVotesListener() {
  yield put(hideVotes());
}

export function* resetVoteRoundListener() {
  yield put(resetVoteRound());
}

export function* setVoteValueListener(message: WSMessage<{ userId: string, voteValue: string }>) {
  yield put(setUserVoteValue(message.body.userId, message.body.voteValue));
}

export function* setVoteRoundTopicListener(message: WSMessage<{ topic: string }>) {
  yield put(setVoteRoundTopic(message.body.topic));
}

export function* modifySessionUserListener(message: WSMessage<{ user: User }>) {
  yield put(addUserToVoteRound(message.body.user));
}
