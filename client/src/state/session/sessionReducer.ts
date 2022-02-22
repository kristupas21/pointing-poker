import { ActionType, Reducer } from 'typesafe-actions';
import storageService, { StorageKey } from 'utils/storageService';
import { User } from 'globalTypes';
import { PointValue } from 'utils/pointValues/types';
import { DEFAULT_POINT_VALUES } from 'utils/pointValues/constants';
import { generatePointValueId, mapPointIndexToPos } from 'utils/pointValues/functions';
import { DEFAULT_USER_ROLES } from 'utils/userRoles';
import { getFirstAvatar } from 'components/Avatar';
import { FIELD_PLACEHOLDER } from 'utils/form/constants';
import { insertAtIndex } from 'utils/common';
import { SessionState } from './sessionModel';
import {
  createPointValue,
  removePointValuePlaceholders,
  removeRolePlaceholders
} from './sessionUtils';
import {
  ADD_SESSION_POINT_VALUE,
  ADD_SESSION_ROLE,
  CLEAR_SESSION_PLACEHOLDERS,
  CLOSE_SESSION,
  INIT_SESSION,
  MODIFY_SESSION_USER,
  REMOVE_SESSION_POINT_VALUE,
  REMOVE_SESSION_ROLE,
  RESET_SESSION_POINT_VALUES,
  RESET_SESSION_ROLES,
  RESET_SESSION_STATE,
  SAVE_SESSION_POINT_VALUE,
  SAVE_SESSION_ROLES,
  SET_SESSION_PARAMS,
  SET_SESSION_USER
} from './sessionConstants';

type Action = ActionType<typeof import('./sessionActions')>;

type State = Readonly<SessionState>;

const initialState: State = {
  currentSessionId: null,
  currentInfoId: null,
  isCreatedByMe: false,
  pointValues: initialPointValues(),
  roles: initialRoles(),
  usePermissions: initialUsePermissions(),
  useRoles: initialUseRoles(),
  user: initialUser(),
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
    case ADD_SESSION_POINT_VALUE: {
      const filteredValues = state.pointValues.filter((p) => p.id !== FIELD_PLACEHOLDER);
      const index = filteredValues.findIndex((p) => p.immutable);
      const pointValues = insertAtIndex(filteredValues, index, createPointValue())
        .map(mapPointIndexToPos);

      return {
        ...state,
        pointValues,
      };
    }
    case REMOVE_SESSION_POINT_VALUE: {
      const pointValues = state.pointValues
        .filter((p) => p.id !== action.payload)
        .map(mapPointIndexToPos);

      storageService.set(StorageKey.PointValues, pointValues);

      return {
        ...state,
        pointValues,
      };
    }
    case SAVE_SESSION_POINT_VALUE: {
      const { id } = action.payload;
      const pointValues = state.pointValues.map((p, pos) => {
        if (id === p.id) {
          return createPointValue({
            ...action.payload,
            pos,
            ...(id === FIELD_PLACEHOLDER && { id: generatePointValueId() })
          });
        }

        return createPointValue({ ...p, pos });
      });

      storageService.set(StorageKey.PointValues, pointValues);

      return {
        ...state,
        pointValues,
      };
    }
    case RESET_SESSION_POINT_VALUES: {
      storageService.remove(StorageKey.PointValues);

      return {
        ...state,
        pointValues: DEFAULT_POINT_VALUES
      };
    }
    case ADD_SESSION_ROLE:
      return {
        ...state,
        roles: [
          ...new Set([...state.roles, FIELD_PLACEHOLDER])
        ],
      };
    case REMOVE_SESSION_ROLE: {
      const roles = state.roles
        .filter((r) => r !== action.payload);

      storageService.set(StorageKey.Roles, roles);

      return {
        ...state,
        roles,
      };
    }
    case SAVE_SESSION_ROLES: {
      storageService.set(StorageKey.Roles, action.payload);

      return {
        ...state,
        roles: action.payload,
      };
    }
    case RESET_SESSION_ROLES: {
      storageService.remove(StorageKey.Roles);

      return {
        ...state,
        roles: DEFAULT_USER_ROLES,
      };
    }
    case CLEAR_SESSION_PLACEHOLDERS: {
      const pointValues = removePointValuePlaceholders(state.pointValues);
      const roles = removeRolePlaceholders(state.roles);

      storageService.set(StorageKey.PointValues, pointValues);
      storageService.set(StorageKey.Roles, roles);

      return {
        ...state,
        pointValues,
        roles,
      };
    }
    case RESET_SESSION_STATE:
    case CLOSE_SESSION:
      return {
        ...initialState,
        user: initialUser(),
        pointValues: initialPointValues(),
        roles: initialRoles(),
        useRoles: initialUseRoles(),
        usePermissions: initialUsePermissions(),
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
    { avatarId: getFirstAvatar() },
    true
  );
}

function initialPointValues(): PointValue[] {
  return (
    storageService.get(StorageKey.PointValues) || DEFAULT_POINT_VALUES
  );
}

function initialRoles(): string[] {
  return (
    storageService.get(StorageKey.Roles) || DEFAULT_USER_ROLES
  );
}

function initialUseRoles(): boolean {
  const useRoles = storageService.get(StorageKey.UseRoles);

  return typeof useRoles === 'boolean' ? useRoles : true;
}

function initialUsePermissions(): boolean {
  const usePermissions = storageService.get(StorageKey.UsePermissions);

  return typeof usePermissions === 'boolean' ? usePermissions : false;
}

export default sessionReducer;
