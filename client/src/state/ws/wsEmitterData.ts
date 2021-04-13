import { select } from 'redux-saga/effects';
import { User } from 'globalTypes';
import { getSessionUser, getSessionUserId } from 'state/session/sessionStateGetters';

/**
 * Function args are payload.
 * Return value is message.body
 */

export function* userDataEmitter() {
  const user = yield select(getSessionUser);

  return { user };
}

export function* userParamsEmitter(params: Partial<User>) {
  const userId = yield select(getSessionUserId);

  return { userId, params };
}
