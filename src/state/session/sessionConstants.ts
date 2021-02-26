import { VoteOption } from './sessionTypes';

export const INIT_SESSION = '@session/INIT';
export const SET_SESSION_PARAMS = '@session/SET_PARAMS';
export const SET_SESSION_USER = '@session/SET_USER';
export const START_SESSION = '@session/START';
export const JOIN_SESSION = '@session/JOIN';
export const LOAD_SESSION = '@session/LOAD';
export const CLOSE_SESSION = '@session/CLOSE';

export const VOTE_OPTION_INFINITY = '∞';
export const VOTE_OPTION_UNKNOWN = '?';

export const DEFAULT_VOTE_OPTIONS: VoteOption[] = [
  { pos: 0, value: '0' },
  { pos: 1, value: '1' },
  { pos: 2, value: '2' },
  { pos: 3, value: '3' },
  { pos: 4, value: '5' },
  { pos: 5, value: '8' },
  { pos: 6, value: '13' },
  { pos: 7, value: '21' },
  { pos: 8, value: '40' },
  { pos: 9, value: '100' },
  { pos: 10, value: VOTE_OPTION_INFINITY },
  { pos: 11, value: VOTE_OPTION_UNKNOWN },
];
