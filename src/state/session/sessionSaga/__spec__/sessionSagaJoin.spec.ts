import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga-test-plan/matchers';
import { MockState } from 'utils/test/types';
import { throwApiError } from 'utils/test/testUtils';
import { push } from 'connected-react-router';
import { setAppLoading } from 'state/app/appActions';
import { ERROR_CODES } from 'constants/errorCodes';
import { throwAppError } from 'state/error/errorActions';
import { joinSession, setSessionParams } from '../../sessionActions';
import { joinSessionSaga } from '../sessionSagaJoin';
import { JoinSessionParams } from '../../sessionModel';
import sessionApi from '../../sessionApi';

describe('joinSessionSaga', () => {
  const mockState: MockState = {
    session: {
      roles: [
        { id: 'r', name: 'r' },
        { id: 'f', name: 'f' }
      ],
      user: {
        id: 'u-id',
      }
    }
  };
  const setSubmitting = jest.fn();
  const setFieldError = jest.fn();

  const getActionParams = (): Parameters<typeof joinSession> => ([
    { name: 'J.Lo', role: 'r', isObserver: false, sessionId: 's-id' },
    setFieldError,
    setSubmitting,
  ]);

  const expectedParams: JoinSessionParams = {
    sessionId: 's-id',
    user: {
      name: 'J.Lo',
      role: { id: 'r', name: 'r' },
      isObserver: false,
      id: 'u-id',
    }
  };

  beforeEach(() => {
    setSubmitting.mockReset();
    setFieldError.mockReset();
  });

  it('acquires params, calls endpoint & navigates to session route', async () => {
    await expectSaga(joinSessionSaga, joinSession(...getActionParams()))
      .withState(mockState)
      .provide([
        [call(sessionApi.join, expectedParams), { data: { sessionId: 's-id' } }]
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
      .put(setAppLoading(false))
      .call(setFieldError, 'sessionId', { id: 'error.sessionNotFound' })
      .call(setSubmitting, false)
      .run();
  });

  it('handles must choose role error', async () => {
    const error = {
      response: {
        data: {
          code: ERROR_CODES.MUST_CHOOSE_ROLE,
          payload: [],
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
      .put(setAppLoading(false))
      .put(setSessionParams({
        currentSessionId: 's-id',
        useRoles: true,
        roles: error.response.data.payload,
      }))
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
      .put(throwAppError(ERROR_CODES.UNEXPECTED))
      .call(setSubmitting, false)
      .run();
  });
});
