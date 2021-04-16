import { io, Socket } from 'socket.io-client';
import { call, take, delay, race } from 'redux-saga/effects';
import { WSEventMapItem, WSHandshakeAuth } from './wsModel';

export const createSocket = (auth: WSHandshakeAuth) => io(
  process.env.REACT_APP_API_URL,
  { autoConnect: false, auth },
);

export function* baseWsEmitter(item: WSEventMapItem, socket: Socket, sessionId: string) {
  const { debounced } = item;

  while (true) {
    let action = yield take(item.event);

    if (debounced) {
      while (true) {
        const { wait, latestAction } = yield race({
          wait: delay(1000),
          latestAction: take(item.event)
        });

        if (wait) {
          socket.emit(item.event, yield* constructWsMessage(action.payload, item, sessionId));
          action = null;
          break;
        }

        action = latestAction;
      }
    }

    if (action) {
      socket.emit(item.event, yield* constructWsMessage(action.payload, item, sessionId));
    }
  }
}

function* constructWsMessage(payload: any, item: WSEventMapItem, sessionId: string) {
  const body = yield item.emitterData
    ? call(item.emitterData, payload)
    : payload || null;

  return { body, sessionId };
}
