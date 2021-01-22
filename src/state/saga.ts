import { fork } from 'redux-saga/effects';
import { createSessionSaga } from './session/sessionSaga';
import errorSaga from './error/errorSaga';

export default function* saga() {
  yield fork(errorSaga);
  yield fork(createSessionSaga);
}
