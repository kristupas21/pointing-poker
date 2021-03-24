import { UserRole } from 'utils/userRoles/types';

export const START_SESSION = '@session/START';

export const JOIN_SESSION = '@session/JOIN';

export const LOAD_SESSION = '@session/LOAD';

export const INIT_SESSION = '@session/INIT';

export const CLOSE_SESSION = '@session/CLOSE';

export const SET_SESSION_PARAMS = '@session/SET_PARAMS';

export const ADD_SESSION_POINT_VALUE = '@session/ADD_POINT_VALUE';

export const REMOVE_SESSION_POINT_VALUE = '@session/REMOVE_POINT_VALUE';

export const SAVE_SESSION_POINT_VALUE = '@session/SAVE_POINT_VALUE';

export const ADD_SESSION_ROLE = '@session/ADD_ROLE';

export const REMOVE_SESSION_ROLE = '@session/REMOVE_ROLE';

export const SAVE_SESSION_ROLE = '@session/SAVE_ROLE';

export const SET_SESSION_USER = '@session/SET_USER';

export const MODIFY_SESSION_USER = '@session/MODIFY_USER';

export const EMPTY_USER_ROLE: UserRole = { name: null, id: null };
