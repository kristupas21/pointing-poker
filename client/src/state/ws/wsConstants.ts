import {
  RESET_VOTE_ROUND,
  HIDE_VOTES,
  SET_USER_VOTE_VALUE,
  SHOW_VOTES,
  SET_VOTE_ROUND_TOPIC, UPDATE_VOTE_ROUND_USER_PERMISSIONS
} from 'state/voteRound/voteRoundConstants';
import { MODIFY_SESSION_USER } from 'state/session/sessionConstants';
import { WSEventMapItem } from './wsModel';
import {
  resetVoteRoundListener,
  hideVotesListener,
  setVoteValueListener,
  showVotesListener,
  userJoinedListener,
  userLeftListener,
  setVoteRoundTopicListener,
  modifySessionUserListener,
  updateSessionPermissionsListener,
  updateVoteRoundUserPermissionsListener, socketErrorListener,
} from './wsListeners';
import { userDataEmitter, userParamsEmitter } from './wsEmitterData';

function withWS(name: string): string {
  return `@@ws/${name}`;
}

const USER_JOINED = 'USER_JOINED';

const USER_LEFT = 'USER_LEFT';

const UPDATE_SESSION_PERMISSIONS = 'UPDATE_SESSION_PERMISSIONS';

const SOCKET_ERROR = 'SOCKET_ERROR';

export const WS_SOCKET_ERROR = withWS(SOCKET_ERROR);

export const WS_USER_JOINED = withWS(USER_JOINED);

export const WS_USER_LEFT = withWS(USER_LEFT);

export const WS_UPDATE_SESSION_PERMISSIONS = withWS(UPDATE_SESSION_PERMISSIONS);

export const WS_UPDATE_VOTE_ROUND_USER_PERMISSIONS = withWS(UPDATE_VOTE_ROUND_USER_PERMISSIONS);

export const WS_SHOW_VOTES = withWS(SHOW_VOTES);

export const WS_HIDE_VOTES = withWS(HIDE_VOTES);

export const WS_RESET_VOTE_ROUND = withWS(RESET_VOTE_ROUND);

export const WS_SET_USER_VOTE_VALUE = withWS(SET_USER_VOTE_VALUE);

export const WS_SET_VOTE_ROUND_TOPIC = withWS(SET_VOTE_ROUND_TOPIC);

export const WS_MODIFY_SESSION_USER = withWS(MODIFY_SESSION_USER);

export const WS_EVENT_MAP: WSEventMapItem[] = [
  {
    event: WS_SOCKET_ERROR,
    listener: socketErrorListener,
  },
  {
    event: WS_USER_JOINED,
    listener: userJoinedListener,
    emitterData: userDataEmitter
  },
  {
    event: WS_USER_LEFT,
    listener: userLeftListener,
    emitterData: userDataEmitter
  },
  {
    event: WS_SET_USER_VOTE_VALUE,
    listener: setVoteValueListener
  },
  {
    event: WS_SHOW_VOTES,
    listener: showVotesListener,
    emitterData: userDataEmitter,
  },
  { event: WS_HIDE_VOTES,
    listener: hideVotesListener,
  },
  {
    event: WS_RESET_VOTE_ROUND,
    listener: resetVoteRoundListener,
    emitterData: userDataEmitter,
  },
  {
    event: WS_SET_VOTE_ROUND_TOPIC,
    listener: setVoteRoundTopicListener,
    debounced: true,
  },
  {
    event: WS_MODIFY_SESSION_USER,
    listener: modifySessionUserListener,
    emitterData: userParamsEmitter
  },
  {
    event: WS_UPDATE_SESSION_PERMISSIONS,
    listener: updateSessionPermissionsListener,
  },
  {
    event: WS_UPDATE_VOTE_ROUND_USER_PERMISSIONS,
    listener: updateVoteRoundUserPermissionsListener,
  }
];
