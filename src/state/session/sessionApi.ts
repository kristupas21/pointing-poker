import api from '../../utils/api';
import { User } from '../../types/global';
import { JoinSessionParams } from './sessionTypes';

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
  start(user: User): Promise<StartSessionResponse>;
  join(params: JoinSessionParams): Promise<GetSessionResponse>;
  load(id: string): Promise<GetSessionResponse>;
}

export default <Api>{
  start(user) {
    return api.post('/session/start', user);
  },

  join(params) {
    return api.post('/session/join', params);
  },

  load(id) {
    return api.get(`/session/load/${id}`);
  }
};
