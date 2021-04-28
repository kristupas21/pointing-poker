import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { ActionType } from 'typesafe-actions';
import { AppRoute, getMatchParamRoute } from 'utils/routes';
import errorParser, { ERROR_CODES } from 'utils/errorParser';
import { throwAppError } from 'state/error/errorActions';
import { setAppLoading } from 'state/app/appActions';
import { joinSession, modifySessionUser, setSessionParams } from '../sessionActions';
import sessionApi from '../sessionApi';
import { JOIN_SESSION } from '../sessionConstants';
import { acquireCurrentUser } from './sessionSagaUtils';
import { JoinSessionResponse } from '../sessionModel';
import { setFormLoading } from '../../form/formActions';

export function* joinSessionSaga(action: ActionType<typeof joinSession>) {
  const {
    formData: {
      sessionId,
      ...rest
    },
    helpers: {
      setSubmitting,
      setFieldError,
      setFieldValue,
    },
  } = action.payload;

  const params = {
    sessionId,
    user: yield* acquireCurrentUser({
      ...rest,
    })
  };

  yield put(setAppLoading(true));
  yield put(setFormLoading(true));

  try {
    const {
      data: {
        sessionId: id,
        user: { hasPermission } }
    }: JoinSessionResponse = yield call(sessionApi.join, params);

    const route = getMatchParamRoute(AppRoute.Session, { sessionId: id });

    yield put(modifySessionUser({ hasPermission }));
    yield put(push(route));
  } catch (e) {
    const { code, payload } = yield call(errorParser.parse, e);

    yield put(setAppLoading(false));

    if (code === ERROR_CODES.SESSION_NOT_FOUND) {
      yield call(setFieldError('sessionId', { id: 'error.sessionNotFound' }));
      return;
    }

    if (code === ERROR_CODES.MUST_CHOOSE_ROLE) {
      yield put(setSessionParams({ roles: payload }));
      yield call(setFieldValue, 'useRoles', true);
      return;
    }

    if (code === ERROR_CODES.USER_NAME_EXISTS) {
      yield call(setFieldError('name', { id: 'error.userNameExists' }));
      return;
    }

    if (code === ERROR_CODES.USER_LIMIT_EXCEEDED) {
      yield call(setFieldError(
        'sessionId',
        { id: 'error.userLimitExceeded', values: { count: payload } }
      ));
      return;
    }

    yield put(throwAppError(code, payload));
  } finally {
    yield call(setSubmitting, false);
    yield put(setFormLoading(false));
  }
}

export default function* sessionSagaJoin() {
  yield takeLatest(JOIN_SESSION, joinSessionSaga);
}
