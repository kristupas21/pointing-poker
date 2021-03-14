import { select, call, put } from 'redux-saga/effects';
import storageService, { StorageKey } from 'utils/storageService';
import { User } from 'types/global';
import { setSessionUser } from '../sessionActions';
import { createUser } from '../sessionUtils';
import { getSessionUser } from '../sessionStateGetters';

export function* acquireCurrentUser(userProps?: Partial<User>): Generator<unknown, User> {
  const user = yield select(getSessionUser);
  const { id, avatarId } = user as User || { id: undefined, avatarId: undefined };
  const props = { ...userProps, id: id || undefined, avatarId } as User;
  const newUser = createUser(props);

  yield call(storageService.set, StorageKey.User, newUser, true);
  yield put(setSessionUser(newUser));

  return newUser;
}
