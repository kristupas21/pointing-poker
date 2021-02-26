import { io, Socket } from 'socket.io-client';
import { call, take } from 'redux-saga/effects';
import { WSEventMapItem } from './wsTypes';

export const createSocket = (auth: { sessionId: string; userId: string }) => io(
  process.env.API_URL || 'http://localhost:9000',
  { autoConnect: false, auth },
);

export function* baseWsEmitter(item: WSEventMapItem, socket: Socket) {
  while (true) {
    const { payload } = yield take(item.event);

    const body = yield item.emitter
      ? call(item.emitter, payload)
      : payload || null;

    socket.emit(item.event, { body });
  }
}
