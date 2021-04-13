import { call, fork, take, spawn } from 'redux-saga/effects';
import { EventChannel, eventChannel } from 'redux-saga';
import { Socket } from 'socket.io-client';
import { WSEventMapItem } from './wsModel';

function createSocketChannel(socket: Socket, event: string) {
  return eventChannel((emit) => {
    socket.on(event, emit);

    return () => {
      socket.off(event, emit);
    };
  });
}

function* messageProcessor(channel, worker) {
  while (true) {
    const payload = yield take(channel);
    yield fork(worker, payload);
  }
}

export function* initWSChannel(socket: Socket, item: WSEventMapItem) {
  const channel: EventChannel<void> = yield call(
    createSocketChannel,
    socket,
    item.event
  );

  yield spawn(messageProcessor, channel, item.listener);

  return channel;
}
