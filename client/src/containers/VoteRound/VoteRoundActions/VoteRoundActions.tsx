import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
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
import Button, { ButtonVariant } from 'components/Button';
import {
  getVoteRoundPristine,
  getVotesShownValue
} from 'state/voteRound/voteRoundStateGetters';
import { useMappedDispatch, useText } from 'utils/customHooks';
import {
  makeClosestPointSelector,
  makeConsensusSelector,
  makeHasPermissionSelector,
  makeVotePercentageSelector
} from 'utils/selectors';
import { IconId } from 'components/Icon';
import styles from './VoteRoundActions.module.scss';

const cx = classNames.bind(styles);

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
const closestPointSelector = makeClosestPointSelector();

const VoteRoundActions: React.FC = () => {
  const votesShown = useSelector(getVotesShownValue);
  const isPristine = useSelector(getVoteRoundPristine);
  const hasPermission = useSelector(hasPermissionSelector);
  const percentage = useSelector(votePercentageSelector);
  const consensus = useSelector(consensusSelector);
  const closestPoint = useSelector(closestPointSelector);
  const { resetVoteRound, hideVotes, showVotes } = useMappedDispatch(actions);
  const text = useText();
  const allVoted = percentage === 100;
  const hasConsensusClass = votesShown && allVoted && consensus;

  const texts = useMemo(() => ({
    percentage: `${percentage}%`,
    storyPoints: closestPoint,
    hideVotes: text('voteRound.action.hideVotes'),
    showVotes: text('voteRound.action.showVotes'),
  }), [text, percentage, closestPoint]);

  const evaluateBubbleText = (): string => {
    if (votesShown) return texts.storyPoints;
    if (!hasPermission) return texts.percentage;
    if (allVoted) return texts.showVotes;
    return texts.percentage;
  };

  const [bubbleText, setBubbleText] = useState(evaluateBubbleText());

  const handleBubbleClick = () => {
    if (votesShown) return hideVotes();
    return showVotes();
  };

  const handleBubbleMouseEnter = () => {
    if (votesShown) return setBubbleText(texts.hideVotes);
    if (allVoted) return undefined;
    return setBubbleText(texts.showVotes);
  };

  const handleBubbleMouseLeave = () => {
    setBubbleText(evaluateBubbleText());
  };

  useEffect(() => {
    setBubbleText(evaluateBubbleText());
  }, [percentage, votesShown, hasPermission, closestPoint]);

  return (
    <div>
      {hasPermission && (
        <Button
          onClick={resetVoteRound}
          disabled={isPristine}
          variant={ButtonVariant.Primary}
          round
          icon={IconId.Reset}
        />
      )}
      <Button
        id="bubble-button"
        onClick={hasPermission ? handleBubbleClick : undefined}
        onMouseEnter={hasPermission ? handleBubbleMouseEnter : undefined}
        onMouseLeave={hasPermission ? handleBubbleMouseLeave : undefined}
        variant={ButtonVariant.Primary}
        mega
        colored={votesShown}
        style={{ pointerEvents: hasPermission ? 'initial' : 'none' }}
      >
        {hasConsensusClass && _tempConsensusDiv(text('voteRound.consensus'))}
        <span className={cx('result', { 'result--shown': votesShown })}>{bubbleText}</span>
      </Button>
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
