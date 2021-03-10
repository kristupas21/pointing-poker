import { select, call, put } from 'redux-saga/effects';
import storageService, { StorageKey } from 'utils/storageService';
import { User } from 'types/global';
import { setSessionUser } from '../sessionActions';
import { createUser } from '../sessionUtils';
import { getSessionUserId } from '../sessionStateGetters';

export function* acquireCurrentUser(userProps?: Partial<User>): Generator<unknown, User> {
  const stateId = yield select(getSessionUserId);
  const props = { ...userProps, id: stateId || undefined } as User;
  const newUser = createUser(props);

  yield call(storageService.set, StorageKey.User, newUser, true);
  yield put(setSessionUser(newUser));

  return newUser;
}
