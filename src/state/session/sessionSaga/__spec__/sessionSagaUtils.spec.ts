import { expectSaga } from 'redux-saga-test-plan';
import { MockState } from 'utils/test/types';
import { User } from 'types/global';
import storageService, { StorageKey } from 'utils/storageService';
import { acquireCurrentUser } from '../sessionSagaUtils';
import { setSessionUser } from '../../sessionActions';

describe('sessionSagaUtils', () => {
  describe('acquireCurrentUser', () => {
    it('combines user props & sets storage values', async () => {
      const mockState: MockState = {
        session: {
          user: {
            isObserver: true,
            role: {
              id: 'r',
              name: 'r',
            },
          },
        },
      };

      const userProps: Partial<User> = {
        id: 'u-id',
        name: 'UserName',
        isObserver: false,
        role: undefined,
      };

      const expectedUser: User = {
        id: 'u-id',
        name: 'UserName',
        isObserver: false,
        role: {
          id: 'r',
          name: 'r',
        },
      };

      await expectSaga(acquireCurrentUser, userProps)
        .withState(mockState)
        .call(storageService.set, StorageKey.User, expectedUser, true)
        .put(setSessionUser(expectedUser))
        .returns(expectedUser)
        .run();
    });
  });
});
