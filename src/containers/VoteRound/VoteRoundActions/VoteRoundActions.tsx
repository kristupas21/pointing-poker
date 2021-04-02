import React from 'react';
import { useSelector } from 'react-redux';
import {
  resetVoteRound as resetVoteRoundAction,
  hideVotes as hideVotesAction,
  showVotes as showVotesAction,
} from 'state/voteRound/voteRoundActions';
import {
  wsShowVotes,
  wsHideVotes,
  wsResetVoteRound,
} from 'state/ws/wsActions';
import Button from 'components/Button';
import { getVoteRoundPristine, getVotesShownValue } from 'state/voteRound/voteRoundStateGetters';
import { useMappedDispatch, useText } from 'utils/customHooks';
import { makeVotePercentageSelector } from 'utils/selectors';

const actions = {
  resetVoteRound: [resetVoteRoundAction, wsResetVoteRound],
  hideVotes: [hideVotesAction, wsHideVotes],
  showVotes: [showVotesAction, wsShowVotes],
};

type A = {
  resetVoteRound: typeof resetVoteRoundAction,
  hideVotes: typeof hideVotesAction,
  showVotes: typeof showVotesAction,
}

const votePercentageSelector = makeVotePercentageSelector();

const VoteRoundActions: React.FC = () => {
  const text = useText();
  const votesShown = useSelector(getVotesShownValue);
  const isPristine = useSelector(getVoteRoundPristine);
  const percentage = useSelector(votePercentageSelector);

  const { resetVoteRound, hideVotes, showVotes } = useMappedDispatch<A>(actions as unknown as A);

  const handleShowHideClick = () => {
    if (votesShown) {
      hideVotes();
    } else {
      showVotes();
    }
  };

  // eslint-disable-next-line
  console.log(`${percentage}%`);

  const showHideTextId = votesShown
    ? 'voteRound.action.hideVotes'
    : 'voteRound.action.showVotes';

  return (
    <div>
      <Button onClick={handleShowHideClick}>
        {text(showHideTextId)}
      </Button>
      <Button onClick={resetVoteRound} disabled={isPristine}>
        {text('voteRound.action.newRound')}
      </Button>
    </div>
  );
};

export default VoteRoundActions;
