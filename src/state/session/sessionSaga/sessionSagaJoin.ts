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

function* joinSaga(action: ActionType<typeof joinSession>) {
  const { formData, setSubmitting } = action.payload;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { sessionId: s, useRoles, ...userProps } = formData;
  const userId = yield* acquireCurrentUserId(userProps);
  const params = createJoinSessionParams(formData, userId);

  try {
    const { data: { sessionId } } = yield call(sessionApi.join, params);
    yield* beginUserSession(params.user, sessionId);
  } catch (e) {
    const error = e?.response?.data?.error;

    if (error === ERROR_CODES.SESSION_NOT_FOUND) {
      yield put(replace(ROUTE.SESSION_NOT_FOUND, { sessionId: action.payload }));
      return;
    }

    if (error === ERROR_CODES.MUST_CHOOSE_ROLE) {
      yield put(setSessionParams(params.sessionId, true));
      return;
    }

    yield put(throwAppError('error.unexpected'));
  } finally {
    yield call(setSubmitting, false);
  }
}

export default function* sessionSagaJoin() {
  yield takeLatest(JOIN_SESSION, joinSaga);
}
