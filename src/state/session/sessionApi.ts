import api from '../../utils/api';
import { User } from '../../types/global';
import { CreateSessionFormData } from '../../containers/CreateSessionForm/CreateSessionForm';

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
  join(data: CreateSessionFormData): Promise<GetSessionResponse>;
  load(id: string): Promise<GetSessionResponse>;
}

export default <Api>{
  start(user) {
    return api.post('/session/start', user);
  },

  join(data) {
    return api.post('/session/join', data);
  },

  load(id) {
    return api.get(`/session/load/${id}`);
  }
};
