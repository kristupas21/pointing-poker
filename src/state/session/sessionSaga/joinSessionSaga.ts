import { call, put, takeLatest } from 'redux-saga/effects';
import { push, replace } from 'connected-react-router';
import { ActionType } from 'typesafe-actions';
import { joinSession } from '../sessionActions';
import sessionApi from '../sessionApi';
import { JOIN_SESSION } from '../sessionConstants';
import { ROUTE, getMatchParamRoute } from '../../../constants/routes';
import { throwAppError } from '../../error/errorActions';

function* joinSaga(action: ActionType<typeof joinSession>) {
  const { formData, setSubmitting } = action.payload;

  try {
    const { data } = yield call(sessionApi.join, formData);
    yield put(push(getMatchParamRoute(ROUTE.SESSION, { sessionId: data.session.id })));
  } catch (e) {
    if (e.response.status === 400) {
      yield put(replace(ROUTE.SESSION_NOT_FOUND, { sessionId: formData.sessionId }));
    } else {
      yield put(throwAppError('error.unexpected'));
    }
  } finally {
    yield call(setSubmitting, false);
  }
}

export default function* joinSessionSaga() {
  yield takeLatest(JOIN_SESSION, joinSaga);
}
