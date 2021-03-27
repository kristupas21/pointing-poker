import { State } from 'globalTypes';
import { AxiosResponse } from 'axios';

export type MockState<T = State> = {
  [P in keyof T]?: MockState<T[P]>;
};

export type MockResponse<T extends AxiosResponse> = Pick<T, 'data'>;
