import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { setSessionId } from '../sessionActions';
import sessionApi from '../sessionApi';
import { START_SESSION } from '../sessionConstants';
import { ROUTE, getMatchParamRoute } from '../../../constants/routes';
import { throwAppError } from '../../error/errorActions';

function* startSaga() {
  try {
    const { data: { sessionId } } = yield call(sessionApi.start);
    yield put(setSessionId(sessionId));
    yield put(push(getMatchParamRoute(ROUTE.SESSION, { sessionId })));
  } catch (e) {
    yield put(throwAppError('error.unexpected'));
  }
}

export default function* startSessionSaga() {
  yield takeLatest(START_SESSION, startSaga);
}
