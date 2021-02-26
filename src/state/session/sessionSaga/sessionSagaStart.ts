import { call, put, takeLatest } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { startSession } from '../sessionActions';
import sessionApi from '../sessionApi';
import { START_SESSION } from '../sessionConstants';
import { throwAppError } from '../../error/errorActions';
import { User } from '../../../types/global';
import { acquireCurrentUserId, beginUserSession } from './sessionSagaUtils';

function* startSaga(action: ActionType<typeof startSession>) {
  const { formData, setSubmitting } = action.payload;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { useRoles, sessionId: s, ...userData } = formData;
  const userId = yield* acquireCurrentUserId();

  const user: User = {
    ...userData,
    id: userId,
  };

  const params = { user, useRoles };

  try {
    const { data: { sessionId } } = yield call(sessionApi.start, params);
    yield* beginUserSession(user, sessionId);
  } catch (e) {
    yield put(throwAppError('error.unexpected'));
  } finally {
    yield call(setSubmitting, false);
  }
}

export default function* sessionSagaStart() {
  yield takeLatest(START_SESSION, startSaga);
}
