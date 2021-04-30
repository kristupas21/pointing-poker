import { ActionType } from 'typesafe-actions';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import errorParser, { ERROR_CODES } from 'utils/errorParser';
import { throwAppError } from 'state/error/errorActions';
import { setFormLoading } from 'state/form/formActions';
import { getSessionInfo, setSessionParams } from '../sessionActions';
import sessionApi from '../sessionApi';
import { SessionInfoResponse } from '../sessionModel';
import { GET_SESSION_INFO } from '../sessionConstants';
import { getSessionCurrentInfoId } from '../sessionStateGetters';

export function* getSessionInfoSaga(action: ActionType<typeof getSessionInfo>) {
  const { sessionId, helpers } = action.payload;
  const { setFieldValue, setFieldError } = helpers;
  const currentInfoId = yield select(getSessionCurrentInfoId);

  if (currentInfoId === sessionId) {
    return;
  }

  yield put(setFormLoading(true));

  try {
    const {
      data: {
        session: {
          roles,
          useRoles
        }
      }
    }: SessionInfoResponse = yield call(sessionApi.getInfo, sessionId);

    if (useRoles) {
      yield put(setSessionParams({ roles }));
    }

    yield call(setFieldValue, 'useRoles', useRoles);
  } catch (e) {
    const { code, payload } = yield call(errorParser.parse, e);

    if (code === ERROR_CODES.SESSION_NOT_FOUND) {
      yield call(setFieldValue, 'useRoles', false);
      yield call(setFieldError, 'sessionId', { id: 'error.sessionNotFound' });
      return;
    }

    yield put(throwAppError(code, payload));
  } finally {
    yield put(setSessionParams({ currentInfoId: sessionId }));
    yield put(setFormLoading(false));
  }
}

export default function* sessionSagaGetInfo() {
  yield takeLatest(GET_SESSION_INFO, getSessionInfoSaga);
}
