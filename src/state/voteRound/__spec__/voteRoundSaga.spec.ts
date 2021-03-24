import { expectSaga } from 'redux-saga-test-plan';
import { MockState } from 'utils/test/types';
import { User } from 'types/global';
import { modifySessionUser } from 'state/session/sessionActions';
import { addUserToVoteRound } from '../voteRoundActions';
import { modifyVoteRoundUserSaga } from '../voteRoundSaga';

describe('voteRoundSaga', () => {
  describe('modifyVoteRoundUserSaga', () => {
    it('updates user props on modify action', async () => {
      const id = 'u-id';
      const mockState: MockState = {
        session: {
          user: {
            id,
          }
        }
      };
      const updatedProps: Partial<User> = {
        isObserver: true,
      };

      await expectSaga(modifyVoteRoundUserSaga, modifySessionUser(updatedProps))
        .withState(mockState)
        .put(addUserToVoteRound({ id, isObserver: true } as User))
        .run();
    });
  });
});
