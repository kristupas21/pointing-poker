import { ComponentType } from 'react';
import { AvatarId } from './types';
import { getIcon, IconId } from '../../utils/iconMap';

const avatarMap: Record<AvatarId, IconId> = {
  [AvatarId.EmojiHappy]: IconId.EmojiHappy,
  [AvatarId.EmojiSad]: IconId.EmojiSad,
};

export const getAvatar = (id: AvatarId): { Component: ComponentType, exists: boolean } => {
  const iconId = avatarMap[id];

  if (iconId) {
    return { Component: getIcon(iconId), exists: true };
  }

  return { Component: getIcon(IconId.BlockSign), exists: false };
};
