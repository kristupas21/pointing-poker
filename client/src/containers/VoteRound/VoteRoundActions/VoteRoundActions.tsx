import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import noop from 'lodash/noop';
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
import {
  getVoteRoundPristine,
  getVotesShownValue
} from 'state/voteRound/voteRoundStateGetters';
import { useMappedDispatch, useText } from 'utils/customHooks';
import { makeConsensusSelector, makeHasPermissionSelector, makeVotePercentageSelector } from 'utils/selectors';

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
const hasPermissionSelector = makeHasPermissionSelector();
const consensusSelector = makeConsensusSelector();

const VoteRoundActions: React.FC = () => {
  const votesShown = useSelector(getVotesShownValue);
  const isPristine = useSelector(getVoteRoundPristine);
  const hasPermission = useSelector(hasPermissionSelector);
  const percentage = useSelector(votePercentageSelector);
  const consensus = useSelector(consensusSelector);
  const { resetVoteRound, hideVotes, showVotes } = useMappedDispatch(actions);
  const text = useText();
  const hideVotesText = text('voteRound.action.hideVotes');
  const showVotesText = text('voteRound.action.showVotes');
  const percentageText = `${percentage}%`;
  const allVoted = percentage === 100;
  const hasConsensusClass = votesShown && allVoted && consensus;

  const evaluateBubbleText = (): string => {
    if (!hasPermission) return percentageText;
    if (votesShown) return hideVotesText;
    if (allVoted) return showVotesText;

    return percentageText;
  };

  const [bubbleText, setBubbleText] = useState(evaluateBubbleText());

  const handleBubbleClick = () => {
    if (!hasPermission) return;
    if (votesShown) hideVotes();
    else showVotes();
  };

  const getMouseHandler = (newText: string) => {
    const handler = () =>
      votesShown || allVoted || setBubbleText(newText);

    return hasPermission ? handler : noop;
  };

  useEffect(() => {
    setBubbleText(evaluateBubbleText());
  }, [percentage, votesShown, hasPermission]);

  return (
    <div>
      <Button
        id="bubble-button"
        onClick={handleBubbleClick}
        onMouseEnter={getMouseHandler(showVotesText)}
        onMouseLeave={getMouseHandler(percentageText)}
      >
        {hasConsensusClass && _tempConsensusDiv(text('voteRound.consensus'))}
        {bubbleText}
      </Button>
      {hasPermission && (
        <Button onClick={resetVoteRound} disabled={isPristine}>
          {text('voteRound.action.newRound')}
        </Button>
      )}
    </div>
  );
};

const _tempConsensusDiv = (text: string) => (
  <div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    color: 'green',
    fontSize: 10,
    transform: 'translateY(-100%)'
  }}
  >
    {text}
  </div>
);

export default VoteRoundActions;
