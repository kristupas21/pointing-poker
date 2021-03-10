import { select } from 'redux-saga/effects';
import { getSessionUser } from 'state/session/sessionStateGetters';

/**
 * Function args are payload.
 * Return value is message.body
 */

export function* userEmitter(sessionId: string) {
  const user = yield select(getSessionUser);

  return { user, sessionId };
}
