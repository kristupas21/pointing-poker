import api from 'utils/api';
import {
  JoinSessionParams,
  JoinSessionResponse,
  LoadSessionParams,
  LoadSessionResponse,
  StartSessionParams,
  StartSessionResponse
} from './sessionModel';

interface Api {
  start(params: StartSessionParams): Promise<StartSessionResponse>;
  join(params: JoinSessionParams): Promise<JoinSessionResponse>;
  load(params: LoadSessionParams): Promise<LoadSessionResponse>;
}

export default <Api>{
  start(params) {
    return api.post('/session/start', params);
  },

  join(params) {
    return api.post('/session/join', params);
  },

  load({ sessionId, userId }) {
    return api.get(`/session/load/${sessionId}`, { params: { userId } });
  }
};
