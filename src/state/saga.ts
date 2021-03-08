import { fork } from 'redux-saga/effects';
import { sessionSagaJoin, sessionSagaLoad, sessionSagaStart } from './session/sessionSaga';
import errorSaga from './error/errorSaga';
import wsSaga from './ws/wsSaga';
import appSaga from './app/appSaga';

export default function* saga() {
  yield fork(appSaga);
  yield fork(errorSaga);
  yield fork(sessionSagaStart);
  yield fork(sessionSagaJoin);
  yield fork(sessionSagaLoad);
  yield fork(wsSaga);
}
