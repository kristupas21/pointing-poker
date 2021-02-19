import { WSEventMapItem } from './wsTypes';
import { userJoinedListener, userLeftListener } from './wsListeners';
import { userEmitter } from './wsEmitters';

export const WS_USER_JOINED = '@ws/USER_JOINED';
export const WS_USER_LEFT = '@ws/USER_LEFT';

export const WS_EVENT_MAP: WSEventMapItem[] = [
  { event: WS_USER_JOINED, listener: userJoinedListener, emitter: userEmitter },
  { event: WS_USER_LEFT, listener: userLeftListener, emitter: userEmitter },
];
