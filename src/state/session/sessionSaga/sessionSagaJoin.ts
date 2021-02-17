import { call, put, takeLatest } from 'redux-saga/effects';
import { replace } from 'connected-react-router';
import { ActionType } from 'typesafe-actions';
import { joinSession } from '../sessionActions';
import sessionApi from '../sessionApi';
import { JOIN_SESSION } from '../sessionConstants';
import { ROUTE } from '../../../constants/routes';
import { throwAppError } from '../../error/errorActions';
import { createJoinSessionParams } from '../sessionUtils';
import { acquireCurrentUserId, beginUserSession } from './sessionSagaUtils';

function* joinSaga(action: ActionType<typeof joinSession>) {
  const { formData, setSubmitting } = action.payload;
  const userId = yield* acquireCurrentUserId();
  const params = createJoinSessionParams(formData, userId);

  try {
    const { data } = yield call(sessionApi.join, params);
    yield* beginUserSession(params.user, data.session.id);
  } catch (e) {
    if (e?.response?.data?.error === 'error.generic.notFound') {
      yield put(replace(ROUTE.SESSION_NOT_FOUND, { sessionId: action.payload }));
    } else {
      yield put(throwAppError('error.unexpected'));
    }
  } finally {
    yield call(setSubmitting, false);
  }
}

export default function* sessionSagaJoin() {
  yield takeLatest(JOIN_SESSION, joinSaga);
}
