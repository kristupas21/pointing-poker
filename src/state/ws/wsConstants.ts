import { WSEventMapItem } from './wsTypes';
import {
  clearVotesListener,
  hideVotesListener,
  showVotesListener,
  userJoinedListener,
  userLeftListener
} from './wsListeners';
import { userEmitter } from './wsEmitters';

export const WS_USER_JOINED = '@ws/USER_JOINED';
export const WS_USER_LEFT = '@ws/USER_LEFT';
export const WS_SHOW_VOTES = '@ws/SHOW_VOTES';
export const WS_HIDE_VOTES = '@ws/HIDE_VOTES';
export const WS_CLEAR_VOTES = '@ws/CLEAR_VOTES';

export const WS_EVENT_MAP: WSEventMapItem[] = [
  { event: WS_USER_JOINED, listener: userJoinedListener, emitter: userEmitter },
  { event: WS_USER_LEFT, listener: userLeftListener, emitter: userEmitter },
  { event: WS_SHOW_VOTES, listener: showVotesListener, emitter: null },
  { event: WS_HIDE_VOTES, listener: hideVotesListener, emitter: null },
  { event: WS_CLEAR_VOTES, listener: clearVotesListener, emitter: null },
];
