import api from '../../utils/api';

interface StartSessionResponse {
  data: {
    sessionId: string;
  };
}

interface Api {
  start(): Promise<StartSessionResponse>;
}

export default <Api>{
  start() {
    return api.post('/start');
  },
};
