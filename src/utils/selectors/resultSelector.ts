import { createSelector } from 'reselect';
import sum from 'lodash/sum';
import { State, User } from '../../types/global';

export default () => createSelector<State, User[], string>(
  (state) => state.voteRound.users,
  (users) => {
    const values =
        users
          .filter((u) => u.voteValue && !Number.isNaN(Number(u.voteValue)))
          .map((u) => Number(u.voteValue));

    if (!values.length) {
      return null;
    }

    return (sum(values) / values.length).toString();
  }
);
