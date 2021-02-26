import { put } from 'redux-saga/effects';
import {
  addUserToVoteRound,
  resetVoteRound,
  hideVotes,
  removeUserFromVoteRound,
  setUserVoteValue,
  showVotes,
  setVoteRoundTopic
} from '../voteRound/voteRoundActions';
import { User } from '../../types/global';
import { WSMessage } from './wsTypes';

export function* userJoinedListener(message: WSMessage<{ user: User }>) {
  yield put(addUserToVoteRound(message.body.user));
}

export function* userLeftListener(message: WSMessage<{ user: User }>) {
  yield put(removeUserFromVoteRound(message.body.user.id));
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
