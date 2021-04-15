import { select, put, takeLatest } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { getSessionCurrentId, getSessionUser } from 'state/session/sessionStateGetters';
import { MODIFY_SESSION_USER } from 'state/session/sessionConstants';
import { modifySessionUser } from 'state/session/sessionActions';
import { addUserToVoteRound } from './voteRoundActions';

export function* modifyVoteRoundUserSaga(action: ActionType<typeof modifySessionUser>) {
  const currentSessionId = yield select(getSessionCurrentId);

  if (!currentSessionId) {
    return;
  }

  const user = yield select(getSessionUser);
  const updatedUser = { ...user, ...action.payload };

  yield put(addUserToVoteRound(updatedUser));
}

export default function* voteRoundSaga() {
  yield takeLatest(MODIFY_SESSION_USER, modifyVoteRoundUserSaga);
}
