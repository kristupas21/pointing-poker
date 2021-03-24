import { expectSaga } from 'redux-saga-test-plan';
import { MockState } from 'utils/test/types';
import { closeSidebarSaga } from '../appSaga';
import { setAppSidebarOpen } from '../appActions';

describe('appSaga', () => {
  describe('closeSidebarSaga', () => {
    it('closes sidebar on location change', async () => {
      const mockState: MockState = {
        app: {
          isSidebarOpen: true,
        },
      };

      await expectSaga(closeSidebarSaga)
        .withState(mockState)
        .put(setAppSidebarOpen(false))
        .run();
    });
  });
});
