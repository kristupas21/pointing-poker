import { AvatarId } from './types';
import { IconId } from '../Icon';
import { AVATAR_MAP } from './constants';

export function getAvatarIcon(id: AvatarId): IconId {
  return AVATAR_MAP[id];
}

export function getFirstAvatar(): AvatarId {
  return AVATAR_MAP[Object.keys(AVATAR_MAP)[0]];
}

export function getCommonAvatarValues(value: string): boolean {
  return !value.startsWith('__secret');
}
