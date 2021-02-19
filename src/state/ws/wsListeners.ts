import { put } from 'redux-saga/effects';
import { addUserToVoteRound, removeUserFromVoteRound } from '../voteRound/voteRoundActions';
import { User } from '../../types/global';
import { WSMessage } from './wsTypes';

export function* userJoinedListener(message: WSMessage<{ user: User }>) {
  yield put(addUserToVoteRound(message.body.user));
}

export function* userLeftListener(message: WSMessage<{ user: User }>) {
  yield put(removeUserFromVoteRound(message.body.user.id));
}
