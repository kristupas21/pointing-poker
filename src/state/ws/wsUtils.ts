import { io } from 'socket.io-client';
import { call, fork, take, spawn } from 'redux-saga/effects';
import { eventChannel, EventChannel } from 'redux-saga';

const socket = io(
  process.env.API_URL || 'http://localhost:9000',
  { autoConnect: false }
);

export function getWSChannel(topic): EventChannel<void> {
  return eventChannel((emit) => {
    socket.connect();
    socket.on(topic, (message) => {
      emit(message);
    });

    return () => {
      socket.off(topic);
      socket.disconnect();
    };
  });
}

function* messageProcessor(channel, worker) {
  while (true) {
    const payload = yield take(channel);
    yield fork(worker, payload);
  }
}

function createWSTopic(sessionId: string): string {
  return `pp.session.${sessionId}`;
}

export function* initWSChannel(sessionId: string, worker) {
  const channel: EventChannel<void> = yield call(
    getWSChannel,
    createWSTopic(sessionId),
  );

  yield spawn(messageProcessor, channel, worker);

  return channel;
}
