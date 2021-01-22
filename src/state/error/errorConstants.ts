export const SET_ERROR_STATE = '@error/SET_STATE';
export const THROW_APP_ERROR = '@error/THROW';

export const getCurrentErrorId = (state => state.error.errorId);
