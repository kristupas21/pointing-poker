import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { ActionType } from 'typesafe-actions';
import { AppRoute, getMatchParamRoute } from 'utils/routes';
import errorParser, { ERROR_CODES } from 'utils/errorParser';
import { throwAppError } from 'state/error/errorActions';
import { setAppLoading } from 'state/app/appActions';
import storageService from 'utils/storageService/storageService';
import { StorageKey } from 'utils/storageService';
import { joinSession, modifySessionUser, setSessionParams } from '../sessionActions';
import sessionApi from '../sessionApi';
import { JOIN_SESSION } from '../sessionConstants';
import { acquireCurrentUser } from './sessionSagaUtils';
import { JoinSessionResponse } from '../sessionModel';

export function* joinSessionSaga(action: ActionType<typeof joinSession>) {
  const {
    formData: {
      sessionId,
      ...rest
    },
    setSubmitting
  } = action.payload;

  const params = {
    sessionId,
    user: yield* acquireCurrentUser({
      ...rest,
    })
  };

  yield put(setAppLoading(true));

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
      yield call(
        storageService.set,
        StorageKey.FormErrors,
        { sessionId: { id: 'error.sessionNotFound' } },
        true,
      );
      return;
    }

    if (code === ERROR_CODES.MUST_CHOOSE_ROLE) {
      yield put(setSessionParams({
        useRoles: true,
        roles: payload as string[],
      }));

      return;
    }

    if (code === ERROR_CODES.USER_NAME_EXISTS) {
      yield call(
        storageService.set,
        StorageKey.FormErrors,
        { name: { id: 'error.userNameExists' } },
        true,
      );
      return;
    }

    yield put(throwAppError(code, payload));
  } finally {
    yield call(setSubmitting, false);
  }
}

export default function* sessionSagaJoin() {
  yield takeLatest(JOIN_SESSION, joinSessionSaga);
}