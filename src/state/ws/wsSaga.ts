import { all, call, fork, put, take } from 'redux-saga/effects';
import { CLOSE_SESSION, SET_SESSION_ID } from '../session/sessionConstants';
import { baseWsEmitter, createSocket } from './wsUtils';
import { wsUserJoined, wsUserLeft } from './wsActions';
import { initWSChannel } from './wsChannel';
import { WS_EVENT_MAP } from './wsConstants';

function* wsSaga() {
  while (true) {
    const { payload: sessionId } = yield take(SET_SESSION_ID);
    const socket = createSocket({ sessionId });

    socket.connect();

    const channels = yield all(WS_EVENT_MAP.map((item) =>
      call(initWSChannel, socket, item)));

    yield all(WS_EVENT_MAP.map((item) =>
      fork(baseWsEmitter, item, socket)));

    yield put(wsUserJoined(sessionId));
    yield take(CLOSE_SESSION);
    yield put(wsUserLeft(sessionId));

    channels.forEach((channel) => channel.close());
    socket.disconnect();
  }
}

export default wsSaga;
