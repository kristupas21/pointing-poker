import { call, put, takeLatest } from 'redux-saga/effects';
import { push, replace } from 'connected-react-router';
import { ActionType } from 'typesafe-actions';
import { joinSession, setSessionParams } from '../sessionActions';
import sessionApi from '../sessionApi';
import { JOIN_SESSION } from '../sessionConstants';
import { getMatchParamRoute, ROUTE } from '../../../constants/routes';
import { throwAppError } from '../../error/errorActions';
import { acquireCurrentUser } from './sessionSagaUtils';
import { ERROR_CODES } from '../../../constants/errorCodes';

function* joinSaga(action: ActionType<typeof joinSession>) {
  const { payload: formData } = action;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { sessionId: formSessionId, useRoles, ...userProps } = formData;
  const user = yield* acquireCurrentUser(userProps);
  const params = { sessionId: formSessionId, user };

  try {
    const { data: { sessionId } } = yield call(sessionApi.join, params);
    yield put(push(getMatchParamRoute(ROUTE.SESSION, { sessionId })));
  } catch (e) {
    const { code, payload } = e?.response?.data || {};

    if (code === ERROR_CODES.SESSION_NOT_FOUND) {
      yield put(replace(ROUTE.SESSION_NOT_FOUND, { sessionId: formSessionId }));
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
