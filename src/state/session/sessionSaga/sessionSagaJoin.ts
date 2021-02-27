import { call, put, takeLatest } from 'redux-saga/effects';
import { replace } from 'connected-react-router';
import { ActionType } from 'typesafe-actions';
import { joinSession, setSessionParams } from '../sessionActions';
import sessionApi from '../sessionApi';
import { JOIN_SESSION } from '../sessionConstants';
import { ROUTE } from '../../../constants/routes';
import { throwAppError } from '../../error/errorActions';
import { createJoinSessionParams } from '../sessionUtils';
import { acquireCurrentUserId, beginUserSession } from './sessionSagaUtils';
import { ERROR_CODES } from '../../../constants/errorCodes';
import storageService from '../../../utils/storageService';

function* joinSaga(action: ActionType<typeof joinSession>) {
  const { payload: formData } = action;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { sessionId: formSessionId, useRoles, ...userProps } = formData;
  const userId = yield* acquireCurrentUserId(userProps);
  const params = createJoinSessionParams(formData, userId);

  if (storageService.get(formSessionId)?.useRoles && !formData.role && !formData.isObserver) {
    yield put(setSessionParams(formSessionId, true));
    return;
  }

  try {
    const { data: { sessionId } } = yield call(sessionApi.join, params);
    yield* beginUserSession(params.user, sessionId);
  } catch (e) {
    const error = e?.response?.data?.error;

    if (error === ERROR_CODES.SESSION_NOT_FOUND) {
      yield put(replace(ROUTE.SESSION_NOT_FOUND, { sessionId: formSessionId }));
      return;
    }

    if (error === ERROR_CODES.MUST_CHOOSE_ROLE) {
      yield put(setSessionParams(formSessionId, true));
      yield call(storageService.set, formSessionId, { useRoles: true }, true);
      return;
    }

    yield put(throwAppError(ERROR_CODES.UNEXPECTED));
  }
}

export default function* sessionSagaJoin() {
  yield takeLatest(JOIN_SESSION, joinSaga);
}
