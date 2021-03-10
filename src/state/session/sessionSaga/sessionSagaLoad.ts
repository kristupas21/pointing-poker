import { call, put, select, takeLatest } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { replace } from 'connected-react-router';
import { ROUTE } from 'constants/routes';
import { ERROR_CODES } from 'constants/errorCodes';
import { throwAppError } from 'state/error/errorActions';
import { initVoteRound } from 'state/voteRound/voteRoundActions';
import { LOAD_SESSION } from '../sessionConstants';
import { initSession, loadSession } from '../sessionActions';
import sessionApi from '../sessionApi';
import { getSessionUserId } from '../sessionStateGetters';

function* loadSaga(action: ActionType<typeof loadSession>) {
  const userId = yield select(getSessionUserId);
  const { payload: sessionId } = action;

  if (!userId) {
    yield put(replace(ROUTE.JOIN_SESSION, { sessionId }));
    return;
  }

  try {
    const {
      data: {
        session: {
          useRoles,
          users,
          showVotes: votesShown,
          currentTopic,
          pointValues,
          roles,
        }
      }
    } = yield call(sessionApi.load, { sessionId, userId });

    yield put(initSession({
      currentSessionId: sessionId,
      useRoles,
      pointValues,
      roles,
    }));

    yield put(initVoteRound({ users, votesShown, currentTopic }));
  } catch (e) {
    const { code } = e?.response?.data || {};

    if (code === ERROR_CODES.NOT_FOUND) {
      yield put(replace(ROUTE.SESSION_NOT_FOUND, { sessionId }));
      return;
    }

    if (code === ERROR_CODES.USER_NOT_FOUND) {
      yield put(replace(ROUTE.JOIN_SESSION, { sessionId }));
      return;
    }

    yield put(throwAppError(code || ERROR_CODES.UNEXPECTED));
  }
}

export default function* sessionSagaLoad() {
  yield takeLatest(LOAD_SESSION, loadSaga);
}
