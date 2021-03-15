import { call, put, takeLatest } from 'redux-saga/effects';
import { push, replace } from 'connected-react-router';
import { ActionType } from 'typesafe-actions';
import { AppRoute, getMatchParamRoute } from 'constants/routes';
import { ERROR_CODES } from 'constants/errorCodes';
import { throwAppError } from 'state/error/errorActions';
import { joinSession, setSessionParams } from '../sessionActions';
import sessionApi from '../sessionApi';
import { JOIN_SESSION } from '../sessionConstants';
import { acquireCurrentUser } from './sessionSagaUtils';

function* joinSaga(action: ActionType<typeof joinSession>) {
  const { payload: formData } = action;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { sessionId: formSessionId, useRoles, ...userProps } = formData;
  const user = yield* acquireCurrentUser(userProps);
  const params = { sessionId: formSessionId, user };

  try {
    const { data: { sessionId } } = yield call(sessionApi.join, params);
    const route = getMatchParamRoute(AppRoute.Session, { sessionId });

    yield put(push(route));
  } catch (e) {
    const { code, payload } = e?.response?.data || {};

    if (code === ERROR_CODES.SESSION_NOT_FOUND) {
      yield put(replace(AppRoute.SessionNotFound, { sessionId: formSessionId }));
      return;
    }

    if (code === ERROR_CODES.MUST_CHOOSE_ROLE) {
      yield put(setSessionParams({
        currentSessionId: formSessionId,
        useRoles: true,
        roles: payload,
      }));

      return;
    }

    yield put(throwAppError(ERROR_CODES.UNEXPECTED));
  }
}

export default function* sessionSagaJoin() {
  yield takeLatest(JOIN_SESSION, joinSaga);
}
