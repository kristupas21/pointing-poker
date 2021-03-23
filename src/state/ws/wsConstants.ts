import {
  RESET_VOTE_ROUND,
  HIDE_VOTES,
  SET_USER_VOTE_VALUE,
  SHOW_VOTES,
  SET_VOTE_ROUND_TOPIC
} from 'state/voteRound/voteRoundConstants';
import { WSEventMapItem } from './wsModel';
import {
  resetVoteRoundListener,
  hideVotesListener,
  setVoteValueListener,
  showVotesListener,
  userJoinedListener,
  userLeftListener, setVoteRoundTopicListener, modifySessionUserListener
} from './wsListeners';
import { modifyUserEmitter, userEmitter } from './wsEmitters';
import { MODIFY_SESSION_USER } from '../session/sessionConstants';

function withWS(name: string): string {
  return `@@ws/${name}`;
}

const USER_JOINED = 'USER_JOINED';

const USER_LEFT = 'USER_LEFT';

export const WS_USER_JOINED = withWS(USER_JOINED);

export const WS_USER_LEFT = withWS(USER_LEFT);

export const WS_SHOW_VOTES = withWS(SHOW_VOTES);

export const WS_HIDE_VOTES = withWS(HIDE_VOTES);

export const WS_RESET_VOTE_ROUND = withWS(RESET_VOTE_ROUND);

export const WS_SET_USER_VOTE_VALUE = withWS(SET_USER_VOTE_VALUE);

export const WS_SET_VOTE_ROUND_TOPIC = withWS(SET_VOTE_ROUND_TOPIC);

export const WS_MODIFY_SESSION_USER = withWS(MODIFY_SESSION_USER);

export const WS_EVENT_MAP: WSEventMapItem[] = [
  { event: WS_USER_JOINED, listener: userJoinedListener, emitter: userEmitter },
  { event: WS_USER_LEFT, listener: userLeftListener, emitter: userEmitter },
  { event: WS_SHOW_VOTES, listener: showVotesListener },
  { event: WS_HIDE_VOTES, listener: hideVotesListener },
  { event: WS_RESET_VOTE_ROUND, listener: resetVoteRoundListener },
  { event: WS_SET_USER_VOTE_VALUE, listener: setVoteValueListener },
  { event: WS_SET_VOTE_ROUND_TOPIC, listener: setVoteRoundTopicListener, debounced: true },
  { event: WS_MODIFY_SESSION_USER, listener: modifySessionUserListener, emitter: modifyUserEmitter },
];
