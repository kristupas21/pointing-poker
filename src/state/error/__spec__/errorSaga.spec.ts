import { expectSaga } from 'redux-saga-test-plan';
import { MockState } from 'utils/test/types';
import { push } from 'connected-react-router';
import { MessageId } from 'lang';
import { AppRoute } from 'utils/routes';
import { mockLocationChange } from 'utils/test/testUtils';
import { clearErrorSaga, throwErrorSaga } from '../errorSaga';
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

  describe('clearErrorSaga', () => {
    it('clears error on location change', async () => {
      const mockState: MockState = {
        error: {
          errorId: 'error.unexpected',
        },
      };

      await expectSaga(clearErrorSaga, mockLocationChange(AppRoute.Base))
        .withState(mockState)
        .put(setErrorState(null))
        .run();
    });

    it('does not clear an error if navigating to error route', async () => {
      const mockState: MockState = {
        error: {
          errorId: 'error.unexpected',
        },
      };

      await expectSaga(clearErrorSaga, mockLocationChange(AppRoute.Error))
        .withState(mockState)
        .not.put(setErrorState(null))
        .run();
    });
  });
});
