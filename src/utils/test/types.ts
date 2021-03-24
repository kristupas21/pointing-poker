import { State } from 'types/global';

export type MockState<T = State> = {
  [P in keyof T]?: MockState<T[P]>;
};
