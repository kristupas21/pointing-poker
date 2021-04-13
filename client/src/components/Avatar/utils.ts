import { calcRandomInteger } from 'utils/mathOps';
import { AvatarId } from './types';
import { IconId } from '../Icon';
import { AVATAR_MAP } from './constants';

export function getAvatarIcon(id: AvatarId): IconId {
  return AVATAR_MAP[id];
}

export function getRandomAvatar(): AvatarId {
  const keys = Object.keys(AVATAR_MAP) as AvatarId[];
  const random = calcRandomInteger(0, keys.length - 1);

  return keys[random];
}
