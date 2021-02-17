import { take, call, put } from 'redux-saga/effects';
import { EventChannel } from 'redux-saga';
import { CLOSE_SESSION, SET_SESSION_ID } from '../session/sessionConstants';
import { setVoteRoundUsers } from '../voteRound/voteRoundActions';
import { initWSChannel } from './wsUtils';
import { WSBodySessionJoined, WSMessage } from './wsTypes';
import { WS_EVENTS } from './wsConstants';

function* wsSaga() {
  while (true) {
    const { payload: sessionId } = yield take(SET_SESSION_ID);

    const channel: EventChannel<void> = yield call(
      initWSChannel,
      sessionId,
      handler,
    );

    yield take(CLOSE_SESSION);

    channel.close();
  }
}

function* handler(message: WSMessage) {
  switch (message.eventType) {
    case WS_EVENTS.SESSION_JOINED: {
      const { body: { session: { users } } } =
          message as WSMessage<WSBodySessionJoined>;

      yield put(setVoteRoundUsers(users));
      break;
    }
    default:
      // eslint-disable-next-line no-console
      console.warn(`Unhandled WS Event: ${message.eventType}`);
  }
}

export default wsSaga;
