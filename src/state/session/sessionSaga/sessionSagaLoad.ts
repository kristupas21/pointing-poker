import { call, put, select, takeLatest } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { replace } from 'connected-react-router';
import { AppRoute } from 'constants/routes';
import { ERROR_CODES } from 'constants/errorCodes';
import { throwAppError } from 'state/error/errorActions';
import { initVoteRound } from 'state/voteRound/voteRoundActions';
import { setAppLoading } from 'state/app/appActions';
import { LOAD_SESSION } from '../sessionConstants';
import { initSession, loadSession } from '../sessionActions';
import sessionApi from '../sessionApi';
import { getSessionUserId } from '../sessionStateGetters';

export function* loadSessionSaga(action: ActionType<typeof loadSession>) {
  const userId = yield select(getSessionUserId);
  const { payload: sessionId } = action;

  if (!userId) {
    yield put(replace(AppRoute.JoinSession, { sessionId }));
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
      yield put(replace(AppRoute.SessionNotFound, { sessionId }));
      return;
    }

    if (code === ERROR_CODES.USER_NOT_FOUND) {
      yield put(replace(AppRoute.JoinSession, { sessionId }));
      return;
    }

    yield put(throwAppError(code || ERROR_CODES.UNEXPECTED));
  } finally {
    yield put(setAppLoading(false));
  }
}

export default function* sessionSagaLoad() {
  yield takeLatest(LOAD_SESSION, loadSessionSaga);
}
