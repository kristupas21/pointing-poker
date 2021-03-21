import { select, put, takeLatest } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { getSessionUser } from 'state/session/sessionStateGetters';
import { addUserToVoteRound } from './voteRoundActions';
import { MODIFY_SESSION_USER } from '../session/sessionConstants';
import { modifySessionUser } from '../session/sessionActions';

function* updateVoteRoundUser(action: ActionType<typeof modifySessionUser>) {
  const user = yield select(getSessionUser);
  const updatedUser = { ...user, ...action.payload };

  yield put(addUserToVoteRound(updatedUser));
}

export default function* voteRoundSaga() {
  yield takeLatest(MODIFY_SESSION_USER, updateVoteRoundUser);
}