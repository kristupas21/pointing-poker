import { put } from 'redux-saga/effects';
import {
  addUserToVoteRound,
  clearVotes,
  hideVotes,
  removeUserFromVoteRound, setUserVoteValue,
  showVotes
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

export function* clearVotesListener() {
  yield put(clearVotes());
}

export function* setVoteValueListener(message: WSMessage<{ userId: string, voteValue: string }>) {
  yield put(setUserVoteValue(message.body.userId, message.body.voteValue));
}
