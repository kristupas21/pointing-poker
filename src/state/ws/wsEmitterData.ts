import { select } from 'redux-saga/effects';
import { User } from 'types/global';
import { getSessionUser, getSessionUserId } from 'state/session/sessionStateGetters';

/**
 * Function args are payload.
 * Return value is message.body
 */

export function* userDataEmitter(sessionId: string) {
  const user = yield select(getSessionUser);

  return { user, sessionId };
}

export function* userParamsEmitter(params: Partial<User>) {
  const userId = yield select(getSessionUserId);

  return { userId, params };
}
