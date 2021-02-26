import { io, Socket } from 'socket.io-client';
import { call, take, delay, race } from 'redux-saga/effects';
import { WSEventMapItem } from './wsTypes';

export const createSocket = (auth: { sessionId: string; userId: string }) => io(
  process.env.API_URL || 'http://localhost:9000',
  { autoConnect: false, auth },
);

export function* baseWsEmitter(item: WSEventMapItem, socket: Socket) {
  const { debounced } = item;

  while (true) {
    let action = yield take(item.event);

    if (debounced) {
      while (true) {
        const { wait, latestAction } = yield race({
          wait: delay(500),
          latestAction: take(item.event)
        });

        if (wait) {
          socket.emit(item.event, { body: yield* getBody(action.payload, item) });
          action = null;
          break;
        }

        action = latestAction;
      }
    }

    if (action) {
      socket.emit(item.event, { body: yield* getBody(action.payload, item) });
    }
  }
}

function* getBody(payload: any, item: WSEventMapItem): Generator<unknown, any> {
  return yield item.emitter
    ? call(item.emitter, payload)
    : payload || null;
}
