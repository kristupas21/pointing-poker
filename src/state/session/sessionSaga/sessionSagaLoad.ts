import { call, put, select, takeLatest } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { replace } from 'connected-react-router';
import { initSession, loadSession } from '../sessionActions';
import sessionApi from '../sessionApi';
import { LOAD_SESSION } from '../sessionConstants';
import { throwAppError } from '../../error/errorActions';
import { initVoteRound } from '../../voteRound/voteRoundActions';
import { ROUTE } from '../../../constants/routes';
import { ERROR_CODES } from '../../../constants/errorCodes';
import { getSessionUserId } from '../sessionStateGetters';

function* loadSaga(action: ActionType<typeof loadSession>) {
  const userId = yield select(getSessionUserId);
  const { payload: sessionId } = action;

  if (!userId) {
    yield put(replace(ROUTE.JOIN_SESSION, { sessionId }));
    return;
  }

  try {
    const { data: { session } } = yield call(sessionApi.load, { sessionId, userId });
    yield put(initSession(sessionId, session.useRoles));
    yield put(initVoteRound(session.users, session.showVotes));
  } catch (e) {
    const error = e?.response?.data?.error;

    if (error === ERROR_CODES.NOT_FOUND) {
      yield put(replace(ROUTE.SESSION_NOT_FOUND, { sessionId }));
      return;
    }

    if (error === ERROR_CODES.USER_NOT_FOUND) {
      yield put(replace(ROUTE.JOIN_SESSION, { sessionId }));
      return;
    }

    yield put(throwAppError(error || 'error.unexpected'));
  }
}

export default function* sessionSagaLoad() {
  yield takeLatest(LOAD_SESSION, loadSaga);
}
