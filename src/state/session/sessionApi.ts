import api from '../../utils/api';

interface CreateResponse {
  data: {
    sessionId: string;
  };
}

interface Api {
  create(): Promise<CreateResponse>;
}

export default <Api>{
  create() {
    return api.post('/create');
  },
};
