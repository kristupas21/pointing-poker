import React, { useEffect, useState } from 'react';
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

type Actions = {
  resetVoteRound: typeof resetVoteRoundAction,
  hideVotes: typeof hideVotesAction,
  showVotes: typeof showVotesAction,
}

const actions = {
  resetVoteRound: [resetVoteRoundAction, wsResetVoteRound],
  hideVotes: [hideVotesAction, wsHideVotes],
  showVotes: [showVotesAction, wsShowVotes],
} as unknown as Actions;

const votePercentageSelector = makeVotePercentageSelector();

const VoteRoundActions: React.FC = () => {
  const votesShown = useSelector(getVotesShownValue);
  const isPristine = useSelector(getVoteRoundPristine);
  const percentage = useSelector(votePercentageSelector);
  const { resetVoteRound, hideVotes, showVotes } = useMappedDispatch(actions);
  const text = useText();
  const hideVotesText = text('voteRound.action.hideVotes');
  const showVotesText = text('voteRound.action.showVotes');
  const percentageText = `${percentage}%`;
  const allVoted = percentage === 100;

  const evaluateBubbleText = (): string => {
    if (votesShown) return hideVotesText;
    if (allVoted) return showVotesText;

    return percentageText;
  };

  const [bubbleText, setBubbleText] = useState(evaluateBubbleText());

  const handleBubbleClick = () => {
    if (votesShown) {
      hideVotes();
    } else {
      showVotes();
    }
  };

  const getMouseHandler = (newText: string) =>
    () => votesShown || allVoted || setBubbleText(newText);

  useEffect(() => {
    setBubbleText(evaluateBubbleText());
  }, [percentage, votesShown]);

  return (
    <div>
      <Button
        id="bubble-button"
        onClick={handleBubbleClick}
        onMouseEnter={getMouseHandler(showVotesText)}
        onMouseLeave={getMouseHandler(percentageText)}
      >
        {bubbleText}
      </Button>
      <Button onClick={resetVoteRound} disabled={isPristine}>
        {text('voteRound.action.newRound')}
      </Button>
    </div>
  );
};

export default VoteRoundActions;
