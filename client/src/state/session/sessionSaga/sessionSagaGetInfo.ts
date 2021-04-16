import { ActionType } from 'typesafe-actions';
import { put, call, takeLatest } from 'redux-saga/effects';
import storageService from 'utils/storageService/storageService';
import { StorageKey } from 'utils/storageService';
import errorParser, { ERROR_CODES } from 'utils/errorParser';
import { throwAppError } from 'state/error/errorActions';
import { getSessionInfo, setSessionFormLoading, setSessionParams } from '../sessionActions';
import sessionApi from '../sessionApi';
import { SessionInfoResponse } from '../sessionModel';
import { GET_SESSION_INFO } from '../sessionConstants';

export function* getSessionInfoSaga(action: ActionType<typeof getSessionInfo>) {
  const { sessionId, callback } = action.payload;

  yield put(setSessionFormLoading(true));

  try {
    const {
      data: {
        session: {
          roles,
          useRoles
        }
      }
    }: SessionInfoResponse = yield call(sessionApi.getInfo, sessionId);

    const params = {
      useRoles,
      ...(useRoles && { roles })
    };

    yield put(setSessionParams(params));
  } catch (e) {
    const { code, payload } = yield call(errorParser.parse, e);

    if (code === ERROR_CODES.SESSION_NOT_FOUND) {
      yield call(
        storageService.set,
        StorageKey.FormErrors,
        { sessionId: { id: 'error.sessionNotFound' } },
        true,
      );
      yield put(setSessionParams({ useRoles: false }));
      return;
    }

    yield put(throwAppError(code, payload));
  } finally {
    yield put(setSessionFormLoading(false));
    yield callback && call(callback);
  }
}

export default function* sessionSagaGetInfo() {
  yield takeLatest(GET_SESSION_INFO, getSessionInfoSaga);
}
