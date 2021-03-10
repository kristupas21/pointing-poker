import { fork } from 'redux-saga/effects';
import { sessionSagaJoin, sessionSagaLoad, sessionSagaStart } from 'state/session/sessionSaga';
import errorSaga from 'state/error/errorSaga';
import wsSaga from 'state/ws/wsSaga';
import appSaga from 'state/app/appSaga';
import voteRoundSaga from 'state/voteRound/voteRoundSaga';

export default function* saga() {
  yield fork(appSaga);
  yield fork(errorSaga);
  yield fork(sessionSagaStart);
  yield fork(sessionSagaJoin);
  yield fork(sessionSagaLoad);
  yield fork(voteRoundSaga);
  yield fork(wsSaga);
}
