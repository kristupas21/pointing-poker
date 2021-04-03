import { call, put, select, takeLatest } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { replace } from 'connected-react-router';
import { AppRoute } from 'utils/routes';
import errorParser, { ERROR_CODES } from 'utils/errorParser';
import { throwAppError } from 'state/error/errorActions';
import { initVoteRound } from 'state/voteRound/voteRoundActions';
import { setAppLoading } from 'state/app/appActions';
import { LOAD_SESSION } from '../sessionConstants';
import { initSession, loadSession } from '../sessionActions';
import sessionApi from '../sessionApi';
import { getSessionUserId } from '../sessionStateGetters';
import { LoadSessionResponse } from '../sessionModel';

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
    }: LoadSessionResponse = yield call(sessionApi.load, { sessionId, userId });

    yield put(initSession({
      currentSessionId: sessionId,
      useRoles,
      pointValues,
      roles,
    }));

    yield put(initVoteRound({ users, votesShown, currentTopic }));
  } catch (e) {
    const { code } = yield call(errorParser.parse, e);

    if (
      code === ERROR_CODES.SESSION_NOT_FOUND ||
      code === ERROR_CODES.USER_NOT_FOUND
    ) {
      yield put(replace(AppRoute.JoinSession, { sessionId }));
      return;
    }

    yield put(throwAppError(code));
  } finally {
    yield put(setAppLoading(false));
  }
}

export default function* sessionSagaLoad() {
  yield takeLatest(LOAD_SESSION, loadSessionSaga);
}
