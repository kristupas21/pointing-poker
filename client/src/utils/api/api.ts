import axios from 'axios';
import qs from 'qs';

const ACTION_TIMEOUT = 30000;
const BASE_URL = '/api/';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: ACTION_TIMEOUT,
  paramsSerializer: (params) =>
    qs.stringify(params, { arrayFormat: 'repeat', allowDots: true }),
});

export default api;
