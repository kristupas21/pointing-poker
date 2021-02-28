import { ActionType, Reducer } from 'typesafe-actions';
import { SessionState } from './sessionTypes';
import {
  ADD_SESSION_POINT_VALUE,
  CLOSE_SESSION,
  INIT_SESSION,
  REMOVE_SESSION_POINT_VALUE,
  SAVE_SESSION_POINT_VALUE,
  SET_SESSION_PARAMS,
  SET_SESSION_USER
} from './sessionConstants';
import storageService, { StorageKey } from '../../utils/storageService';
import { User } from '../../types/global';
import { PointValue } from '../../utils/pointValues/types';
import { DEFAULT_POINT_VALUES } from '../../utils/pointValues/constants';
import { createPointValue } from './sessionUtils';

type Action = ActionType<typeof import('./sessionActions')>;

type State = Readonly<SessionState>;

const getSessionUser = (): User => storageService.get(StorageKey.User);

const getSessionPointValues = (): PointValue[] =>
  storageService.get(StorageKey.PointValues) || DEFAULT_POINT_VALUES;

const initialState: State = {
  currentSessionId: null,
  user: getSessionUser(),
  useRoles: false,
  pointValues: getSessionPointValues(),
};

const sessionReducer: Reducer<State, Action> = (state = initialState, action) => {
  switch (action.type) {
    case INIT_SESSION:
    case SET_SESSION_PARAMS:
      return {
        ...state,
        ...action.payload,
      };
    case SET_SESSION_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SAVE_SESSION_POINT_VALUE: {
      const pointValues = state.pointValues.map((p) => ({
        ...p,
        ...(p.id === action.payload.id && action.payload)
      }));

      storageService.set(StorageKey.PointValues, pointValues);

      return {
        ...state,
        pointValues,
      };
    }
    case ADD_SESSION_POINT_VALUE:
      return {
        ...state,
        pointValues: [
          ...state.pointValues,
          createPointValue({ pos: state.pointValues.length }),
        ],
      };
    case REMOVE_SESSION_POINT_VALUE: {
      const pointValues = state.pointValues
        .filter((p) => p.id !== action.payload)
        .map((p, pos) => createPointValue({ ...p, pos }));

      storageService.set(StorageKey.PointValues, pointValues);

      return {
        ...state,
        pointValues,
      };
    }
    case CLOSE_SESSION:
      return {
        ...initialState,
        user: getSessionUser(),
        pointValues: getSessionPointValues(),
      };
    default:
      return state;
  }
};

export default sessionReducer;
