import { io, Socket } from 'socket.io-client';
import { call, take } from 'redux-saga/effects';
import { WSEventMapItem } from './wsTypes';

export const createSocket = (auth: { sessionId: string; }) => io(
  process.env.API_URL || 'http://localhost:9000',
  { autoConnect: false, auth },
);

export function* baseWsEmitter(item: WSEventMapItem, socket: Socket) {
  while (true) {
    const { payload } = yield take(item.event);
    const body = yield call(item.emitter, payload);

    socket.emit(item.event, { body });
  }
}
