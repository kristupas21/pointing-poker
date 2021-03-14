import { select, takeLeading, put, takeLatest } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { User } from 'types/global';
import { getSessionUser, getSessionUserId } from 'state/session/sessionStateGetters';
import { getVoteRoundUsers } from './voteRoundStateGetters';
import { addUserToVoteRound, setUserVoteValue, showVotes } from './voteRoundActions';
import { SET_USER_VOTE_VALUE } from './voteRoundConstants';
import { MODIFY_SESSION_USER } from '../session/sessionConstants';
import { modifySessionUser } from '../session/sessionActions';

function* showVotesIfAllVoted(action: ActionType<typeof setUserVoteValue>) {
  const userId = yield select(getSessionUserId);

  if (userId !== action.payload.userId) {
    return;
  }

  const users: User[] = yield select(getVoteRoundUsers);
  const allVoted = users.every((u) => u.voteValue != null);

  if (allVoted) {
    yield put(showVotes());
  }
}

function* updateVoteRoundUser(action: ActionType<typeof modifySessionUser>) {
  const user = yield select(getSessionUser);
  const updatedUser = { ...user, ...action.payload };

  yield put(addUserToVoteRound(updatedUser));
}

export default function* voteRoundSaga() {
  yield takeLeading(SET_USER_VOTE_VALUE, showVotesIfAllVoted);
  yield takeLatest(MODIFY_SESSION_USER, updateVoteRoundUser);
}
