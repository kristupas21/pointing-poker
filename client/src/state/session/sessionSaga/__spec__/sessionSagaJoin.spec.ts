import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga-test-plan/matchers';
import { MockResponse, MockState } from 'utils/test/types';
import { throwApiError } from 'utils/test/testUtils';
import { push } from 'connected-react-router';
import { setAppLoading } from 'state/app/appActions';
import errorParser, { ERROR_CODES } from 'utils/errorParser';
import { throwAppError } from 'state/error/errorActions';
import storageService from 'utils/storageService/storageService';
import { StorageKey } from 'utils/storageService';
import { joinSession } from '../../sessionActions';
import { joinSessionSaga } from '../sessionSagaJoin';
import { JoinSessionParams, JoinSessionResponse } from '../../sessionModel';
import sessionApi from '../../sessionApi';

describe('joinSessionSaga', () => {
  const mockState: MockState = {
    session: {
      roles: [
        'r',
        'f',
      ],
      user: {
        id: 'u-id',
      }
    }
  };
  const setSubmitting = jest.fn();

  const getActionParams = (): Parameters<typeof joinSession> => ([
    { name: 'J.Lo', role: 'r', isObserver: false, sessionId: 's-id' },
    setSubmitting,
  ]);

  const expectedParams: JoinSessionParams = {
    sessionId: 's-id',
    user: {
      name: 'J.Lo',
      role: 'r',
      isObserver: false,
      id: 'u-id',
    }
  };

  beforeEach(() => {
    setSubmitting.mockReset();
  });

  it('acquires params, calls endpoint & navigates to session route', async () => {
    const response: MockResponse<JoinSessionResponse> = {
      data: {
        sessionId: 's-id'
      },
    };

    await expectSaga(joinSessionSaga, joinSession(...getActionParams()))
      .withState(mockState)
      .provide([
        [call(sessionApi.join, expectedParams), response]
      ])
      .put(setAppLoading(true))
      .call(sessionApi.join, expectedParams)
      .put(push('/session/s-id'))
      .call(setSubmitting, false)
      .run();
  });

  it('handles not found session error', async () => {
    const error = {
      response: {
        data: {
          code: ERROR_CODES.SESSION_NOT_FOUND
        }
      }
    };

    await expectSaga(joinSessionSaga, joinSession(...getActionParams()))
      .withState(mockState)
      .provide([
        [call(sessionApi.join, expectedParams), throwApiError(error)]
      ])
      .put(setAppLoading(true))
      .call(sessionApi.join, expectedParams)
      .call(errorParser.parse, error)
      .call(
        storageService.set,
        StorageKey.FormErrors,
        { sessionId: { id: 'error.sessionNotFound' } },
        true,
      )
      .put(setAppLoading(false))
      .call(setSubmitting, false)
      .run();
  });

  it('handles user name exists error', async () => {
    const error = {
      response: {
        data: {
          code: ERROR_CODES.USER_NAME_EXISTS
        }
      }
    };

    await expectSaga(joinSessionSaga, joinSession(...getActionParams()))
      .withState(mockState)
      .provide([
        [call(sessionApi.join, expectedParams), throwApiError(error)]
      ])
      .put(setAppLoading(true))
      .call(sessionApi.join, expectedParams)
      .call(errorParser.parse, error)
      .call(
        storageService.set,
        StorageKey.FormErrors,
        { name: { id: 'error.userNameExists' } },
        true,
      )
      .put(setAppLoading(false))
      .call(setSubmitting, false)
      .run();
  });

  it('handles unexpected error', async () => {
    const error = new Error();

    await expectSaga(joinSessionSaga, joinSession(...getActionParams()))
      .withState(mockState)
      .provide([
        [call(sessionApi.join, expectedParams), throwApiError(error)]
      ])
      .put(setAppLoading(true))
      .call(sessionApi.join, expectedParams)
      .put(setAppLoading(false))
      .call(errorParser.parse, error)
      .put(throwAppError(ERROR_CODES.UNEXPECTED))
      .call(setSubmitting, false)
      .run();
  });
});
