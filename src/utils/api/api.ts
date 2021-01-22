import axios from 'axios';
import qs from 'qs';

const ACTION_TIMEOUT = 30000;

export default axios.create({
  baseURL: '/api/',
  timeout: ACTION_TIMEOUT,
  paramsSerializer: (params) =>
    qs.stringify(params, { arrayFormat: 'repeat', allowDots: true }),
});
