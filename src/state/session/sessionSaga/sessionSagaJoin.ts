import { call, put, takeLatest, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { ActionType } from 'typesafe-actions';
import { AppRoute, getMatchParamRoute } from 'constants/routes';
import { ERROR_CODES } from 'constants/errorCodes';
import { throwAppError } from 'state/error/errorActions';
import { findRoleById } from 'utils/userRoles/utils';
import { setAppLoading } from 'state/app/appActions';
import { joinSession, setSessionParams } from '../sessionActions';
import sessionApi from '../sessionApi';
import { JOIN_SESSION } from '../sessionConstants';
import { acquireCurrentUser } from './sessionSagaUtils';
import { getSessionRoles } from '../sessionStateGetters';

export function* joinSessionSaga(action: ActionType<typeof joinSession>) {
  const {
    formData: {
      sessionId,
      role,
      ...rest
    },
    setFieldError,
    setSubmitting
  } = action.payload;

  const params = {
    sessionId,
    user: yield* acquireCurrentUser({
      ...rest,
      role: findRoleById(yield select(getSessionRoles), role)
    })
  };

  yield put(setAppLoading(true));

  try {
    const { data: { sessionId: id } } = yield call(sessionApi.join, params);
    const route = getMatchParamRoute(AppRoute.Session, { sessionId: id });

    yield put(push(route));
  } catch (e) {
    const { code, payload } = e?.response?.data || {};

    yield put(setAppLoading(false));

    if (code === ERROR_CODES.SESSION_NOT_FOUND) {
      yield call(setFieldError, 'sessionId', { id: 'error.sessionNotFound' });
      return;
    }

    if (code === ERROR_CODES.MUST_CHOOSE_ROLE) {
      yield put(setSessionParams({
        currentSessionId: sessionId,
        useRoles: true,
        roles: payload,
      }));

      return;
    }

    yield put(throwAppError(ERROR_CODES.UNEXPECTED));
  } finally {
    yield call(setSubmitting, false);
  }
}

export default function* sessionSagaJoin() {
  yield takeLatest(JOIN_SESSION, joinSessionSaga);
}
