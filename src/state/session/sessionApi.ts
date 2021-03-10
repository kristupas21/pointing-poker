import api from 'utils/api';
import { User } from 'types/global';
import { JoinSessionParams, LoadSessionParams, StartSessionParams } from './sessionModel';

interface StartSessionResponse {
  data: {
    sessionId: string;
  };
}

interface GetSessionResponse {
  data: {
    session: {
      id: string;
      users: User[];
    }
  }
}

interface Api {
  start(params: StartSessionParams): Promise<StartSessionResponse>;
  join(params: JoinSessionParams): Promise<GetSessionResponse>;
  load(params: LoadSessionParams): Promise<GetSessionResponse>;
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
