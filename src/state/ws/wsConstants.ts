import { WSEventMapItem } from './wsModel';
import {
  resetVoteRoundListener,
  hideVotesListener,
  setVoteValueListener,
  showVotesListener,
  userJoinedListener,
  userLeftListener, setVoteRoundTopicListener
} from './wsListeners';
import { userEmitter } from './wsEmitters';
import {
  RESET_VOTE_ROUND,
  HIDE_VOTES,
  SET_USER_VOTE_VALUE,
  SHOW_VOTES,
  SET_VOTE_ROUND_TOPIC
} from '../voteRound/voteRoundConstants';

export const WS_USER_JOINED = '@@ws/USER_JOINED';
export const WS_USER_LEFT = '@@ws/USER_LEFT';
export const WS_SHOW_VOTES = `@@ws/${SHOW_VOTES}`;
export const WS_HIDE_VOTES = `@@ws/${HIDE_VOTES}`;
export const WS_RESET_VOTE_ROUND = `@@ws/${RESET_VOTE_ROUND}`;
export const WS_SET_USER_VOTE_VALUE = `@@ws/${SET_USER_VOTE_VALUE}`;
export const WS_SET_VOTE_ROUND_TOPIC = `@@ws/${SET_VOTE_ROUND_TOPIC}`;

export const WS_EVENT_MAP: WSEventMapItem[] = [
  { event: WS_USER_JOINED, listener: userJoinedListener, emitter: userEmitter },
  { event: WS_USER_LEFT, listener: userLeftListener, emitter: userEmitter },
  { event: WS_SHOW_VOTES, listener: showVotesListener },
  { event: WS_HIDE_VOTES, listener: hideVotesListener },
  { event: WS_RESET_VOTE_ROUND, listener: resetVoteRoundListener },
  { event: WS_SET_USER_VOTE_VALUE, listener: setVoteValueListener },
  { event: WS_SET_VOTE_ROUND_TOPIC, listener: setVoteRoundTopicListener, debounced: true },
];
