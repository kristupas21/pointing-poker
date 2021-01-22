import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { setSessionId } from '../sessionActions';
import sessionApi from '../sessionApi';
import { CREATE_SESSION } from '../sessionConstants';
import ROUTES, { getMatchParamRoute } from '../../../constants/routes';
import { throwAppError } from '../../error/errorActions';

function* createSaga() {
  try {
    const { data: { sessionId } } = yield call(sessionApi.create);
    yield put(setSessionId(sessionId));
    yield put(push(getMatchParamRoute(ROUTES.SESSION, { sessionId })));
  } catch (e) {
    yield put(throwAppError('error.unexpected'));
  }
}

export default function* createSessionSaga() {
  yield takeLatest(CREATE_SESSION, createSaga);
}
