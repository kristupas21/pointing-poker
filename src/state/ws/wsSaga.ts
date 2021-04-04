import { all, call, fork, put, select, take, cancel } from 'redux-saga/effects';
import { getSessionUserId } from 'state/session/sessionStateGetters';
import { CLOSE_SESSION, INIT_SESSION } from 'state/session/sessionConstants';
import { baseWsEmitter, createSocket } from './wsUtils';
import { initWSChannel } from './wsChannel';
import { WS_EVENT_MAP } from './wsConstants';
import { wsUserJoined } from './wsActions';

function* wsSaga() {
  while (true) {
    const { payload: { currentSessionId: sessionId } } = yield take(INIT_SESSION);
    const userId = yield select(getSessionUserId);
    const socket = createSocket({ sessionId, userId });

    socket.connect();

    const channels = yield all(WS_EVENT_MAP.map((item) =>
      call(initWSChannel, socket, item)));

    const tasks = yield all(WS_EVENT_MAP.map((item) =>
      fork(baseWsEmitter, item, socket)));

    yield put(wsUserJoined(sessionId));
    yield take(CLOSE_SESSION);

    channels.forEach((channel) => channel.close());

    yield cancel([...tasks]);

    socket.disconnect();
  }
}

export default wsSaga;
