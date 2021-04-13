import { expectSaga } from 'redux-saga-test-plan';
import { MockState } from 'utils/test/types';
import { push } from 'connected-react-router';
import { MessageId } from 'lang';
import { AppRoute } from 'utils/routes';
import { throwErrorSaga } from '../errorSaga';
import { setErrorState, throwAppError } from '../errorActions';

describe('errorSaga', () => {
  describe('throwErrorSaga', () => {
    it('sets error with redirect path & navigates to error route', async () => {
      const errorId: MessageId = 'error.unexpected';
      const pathname = '/some-path';
      const mockState: MockState = {
        router: {
          location: {
            pathname,
          }
        }
      };

      await expectSaga(throwErrorSaga, throwAppError(errorId))
        .withState(mockState)
        .put(setErrorState({ errorId, redirectPath: pathname }))
        .put(push(AppRoute.Error))
        .run();
    });
  });
});
