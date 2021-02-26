import { select } from 'redux-saga/effects';
import { getSessionUser } from '../session/sessionStateGetters';

export function* userEmitter(sessionId: string) {
  const user = yield select(getSessionUser);

  return { user, sessionId };
}
