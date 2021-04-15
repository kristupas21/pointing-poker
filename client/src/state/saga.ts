import { fork } from 'redux-saga/effects';
import {
  sessionSagaJoin,
  sessionSagaLoad,
  sessionSagaStart,
  sessionSagaGetInfo
} from 'state/session/sessionSaga';
import errorSaga from 'state/error/errorSaga';
import wsSaga from 'state/ws/wsSaga';
import voteRoundSaga from 'state/voteRound/voteRoundSaga';
import appSaga from 'state/app/appSaga';

export default function* saga() {
  yield fork(appSaga);
  yield fork(errorSaga);
  yield fork(sessionSagaStart);
  yield fork(sessionSagaJoin);
  yield fork(sessionSagaLoad);
  yield fork(sessionSagaGetInfo);
  yield fork(voteRoundSaga);
  yield fork(wsSaga);
}
