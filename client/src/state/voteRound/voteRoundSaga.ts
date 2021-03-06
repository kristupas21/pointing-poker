import { select, put, takeLatest } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { getSessionCurrentId, getSessionUserId } from 'state/session/sessionStateGetters';
import { MODIFY_SESSION_USER } from 'state/session/sessionConstants';
import { modifySessionUser } from 'state/session/sessionActions';
import { addUserToVoteRound } from './voteRoundActions';
import { getVoteRoundUsers } from './voteRoundStateGetters';
import { findUserById } from '../../utils/selectors/utils';

export function* modifyVoteRoundUserSaga(action: ActionType<typeof modifySessionUser>) {
  const currentSessionId = yield select(getSessionCurrentId);

  if (!currentSessionId) {
    return;
  }

  const users = yield select(getVoteRoundUsers);
  const userId = yield select(getSessionUserId);
  const updatedUser = { ...findUserById(users, userId), ...action.payload };

  yield put(addUserToVoteRound(updatedUser));
}

export default function* voteRoundSaga() {
  yield takeLatest(MODIFY_SESSION_USER, modifyVoteRoundUserSaga);
}
