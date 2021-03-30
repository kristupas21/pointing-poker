import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga-test-plan/matchers';
import { MockResponse, MockState } from 'utils/test/types';
import { throwApiError } from 'utils/test/testUtils';
import { replace } from 'connected-react-router';
import { AppRoute } from 'utils/routes';
import errorParser, { ERROR_CODES } from 'utils/errorParser';
import { initVoteRound } from 'state/voteRound/voteRoundActions';
import { setAppLoading } from 'state/app/appActions';
import { throwAppError } from 'state/error/errorActions';
import { LoadSessionResponse } from '../../sessionModel';
import { loadSessionSaga } from '../sessionSagaLoad';
import { initSession, loadSession } from '../../sessionActions';
import sessionApi from '../../sessionApi';

describe('loadSessionSaga', () => {
  const sessionId = 's-id';
  const userId = 'u-id';
  const mockState: MockState = {
    session: {
      user: {
        id: userId,
      },
    },
  };

  it('redirects to join session route if no user id is present', async () => {
    const mockEmptyState: MockState = {
      session: {
        user: null,
      },
    };

    await expectSaga(loadSessionSaga, loadSession(sessionId))
      .withState(mockEmptyState)
      .put(replace(AppRoute.JoinSession, { sessionId }))
      .run();
  });

  it('calls endpoint, inits session & vote round', async () => {
    const response: MockResponse<LoadSessionResponse> = {
      data: {
        session: {
          useRoles: true,
          roles: [],
          pointValues: [],
          currentTopic: '',
          showVotes: false,
          users: [],
        }
      }
    };

    await expectSaga(loadSessionSaga, loadSession(sessionId))
      .withState(mockState)
      .provide([
        [call(sessionApi.load, { sessionId, userId }), response]
      ])
      .call(sessionApi.load, { sessionId, userId })
      .put(initSession({
        currentSessionId: sessionId,
        useRoles: response.data.session.useRoles,
        roles: response.data.session.roles,
        pointValues: response.data.session.pointValues,
      }))
      .put(initVoteRound({
        users: response.data.session.users,
        currentTopic: response.data.session.currentTopic,
        votesShown: response.data.session.showVotes,
      }))
      .put(setAppLoading(false))
      .run();
  });

  it('handles session not found error', async () => {
    const error = {
      response: {
        data: {
          code: ERROR_CODES.SESSION_NOT_FOUND,
        }
      }
    };

    await expectSaga(loadSessionSaga, loadSession(sessionId))
      .withState(mockState)
      .provide([
        [call(sessionApi.load, { sessionId, userId }), throwApiError(error)]
      ])
      .call(sessionApi.load, { sessionId, userId })
      .call(errorParser.parse, error)
      .put(replace(AppRoute.SessionNotFound, { sessionId }))
      .put(setAppLoading(false))
      .run();
  });

  it('handles user not found error', async () => {
    const error = {
      response: {
        data: {
          code: ERROR_CODES.USER_NOT_FOUND,
        }
      }
    };

    await expectSaga(loadSessionSaga, loadSession(sessionId))
      .withState(mockState)
      .provide([
        [call(sessionApi.load, { sessionId, userId }), throwApiError(error)]
      ])
      .call(sessionApi.load, { sessionId, userId })
      .call(errorParser.parse, error)
      .put(replace(AppRoute.JoinSession, { sessionId }))
      .put(setAppLoading(false))
      .run();
  });

  it('handles unexpected error', async () => {
    const error = new Error();

    await expectSaga(loadSessionSaga, loadSession(sessionId))
      .withState(mockState)
      .provide([
        [call(sessionApi.load, { sessionId, userId }), throwApiError(error)]
      ])
      .call(sessionApi.load, { sessionId, userId })
      .call(errorParser.parse, error)
      .put(throwAppError(ERROR_CODES.UNEXPECTED))
      .put(setAppLoading(false))
      .run();
  });
});
