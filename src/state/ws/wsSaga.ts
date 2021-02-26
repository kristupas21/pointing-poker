import { all, call, fork, put, select, take } from 'redux-saga/effects';
import { CLOSE_SESSION, INIT_SESSION } from '../session/sessionConstants';
import { baseWsEmitter, createSocket } from './wsUtils';
import { initWSChannel } from './wsChannel';
import { WS_EVENT_MAP } from './wsConstants';
import { getSessionUserId } from '../session/sessionStateGetters';
import { wsUserJoined } from './wsActions';

function* wsSaga() {
  while (true) {
    const { payload: { sessionId } } = yield take(INIT_SESSION);
    const userId = yield select(getSessionUserId);
    const socket = createSocket({ sessionId, userId });

    socket.connect();

    const channels = yield all(WS_EVENT_MAP.map((item) =>
      call(initWSChannel, socket, item)));

    yield all(WS_EVENT_MAP.map((item) =>
      fork(baseWsEmitter, item, socket)));

    yield put(wsUserJoined(sessionId));
    yield take(CLOSE_SESSION);

    channels.forEach((channel) => channel.close());
    socket.disconnect();
  }
}

export default wsSaga;
