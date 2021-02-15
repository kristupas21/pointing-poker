import { fork } from 'redux-saga/effects';
import { joinSessionSaga, loadSessionSaga, startSessionSaga } from './session/sessionSaga';
import errorSaga from './error/errorSaga';

export default function* saga() {
  yield fork(errorSaga);
  yield fork(startSessionSaga);
  yield fork(joinSessionSaga);
  yield fork(loadSessionSaga);
}
