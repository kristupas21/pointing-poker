import { ActionType, Reducer } from 'typesafe-actions';
import storageService, { StorageKey } from 'utils/storageService';
import { User } from 'globalTypes';
import { PointValue } from 'utils/pointValues/types';
import { DEFAULT_POINT_VALUES } from 'utils/pointValues/constants';
import { UserRole } from 'utils/userRoles/types';
import { DEFAULT_USER_ROLES } from 'utils/userRoles/constants';
import { getRandomAvatar } from 'components/Avatar';
import { SessionState } from './sessionModel';
import { createPointValue, createRole } from './sessionUtils';
import {
  ADD_SESSION_POINT_VALUE,
  ADD_SESSION_ROLE,
  CLOSE_SESSION,
  INIT_SESSION,
  MODIFY_SESSION_USER,
  REMOVE_SESSION_POINT_VALUE,
  REMOVE_SESSION_ROLE,
  SAVE_SESSION_POINT_VALUE,
  SAVE_SESSION_ROLE,
  SET_SESSION_PARAMS,
  SET_SESSION_USER
} from './sessionConstants';

type Action = ActionType<typeof import('./sessionActions')>;

type State = Readonly<SessionState>;

const initialState: State = {
  currentSessionId: null,
  user: initialUser(),
  useRoles: false,
  pointValues: initialPointValues(),
  roles: initialRoles(),
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
    case MODIFY_SESSION_USER: {
      const { payload: params } = action;

      storageService.set(StorageKey.User, params, true);

      return {
        ...state,
        user: {
          ...state.user,
          ...params,
        }
      };
    }
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
    case SAVE_SESSION_ROLE: {
      const roles = state.roles.map((p) => ({
        ...p,
        ...(p.id === action.payload.id && action.payload)
      }));

      storageService.set(StorageKey.Roles, roles);

      return {
        ...state,
        roles,
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
    case ADD_SESSION_ROLE:
      return {
        ...state,
        roles: [
          ...state.roles,
          createRole(),
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
    case REMOVE_SESSION_ROLE: {
      const roles = state.roles
        .filter((p) => p.id !== action.payload);

      storageService.set(StorageKey.Roles, roles);

      return {
        ...state,
        roles,
      };
    }
    case CLOSE_SESSION:
      return {
        ...initialState,
        user: initialUser(),
        pointValues: initialPointValues(),
        roles: initialRoles(),
      };
    default:
      return state;
  }
};

function initialUser(): User {
  const user = storageService.get<User>(StorageKey.User);

  if (user?.avatarId) {
    return user;
  }

  return storageService.set<User>(
    StorageKey.User,
    { avatarId: getRandomAvatar() },
    true
  );
}

function initialPointValues(): PointValue[] {
  return (
    storageService.get(StorageKey.PointValues) || DEFAULT_POINT_VALUES
  );
}

function initialRoles(): UserRole[] {
  return (
    storageService.get(StorageKey.Roles) || DEFAULT_USER_ROLES
  );
}

export default sessionReducer;
