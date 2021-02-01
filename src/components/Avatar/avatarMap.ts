import { ComponentType } from 'react';
import { ReactComponent as EmojiHappy } from '../../assets/svg/avatars/emoji-happy.svg';
import { ReactComponent as EmojiSad } from '../../assets/svg/avatars/emoji-sad.svg';
import { ReactComponent as BlockSign } from '../../assets/svg/avatars/block-sign.svg';
import { AvatarId } from './types';

const avatarMap: Record<AvatarId, ComponentType> = {
  [AvatarId.EmojiHappy]: EmojiHappy,
  [AvatarId.EmojiSad]: EmojiSad,
};

export const getAvatar = (id: AvatarId): { Component: ComponentType, exists: boolean } => {
  if (avatarMap[id]) {
    return { Component: avatarMap[id], exists: true };
  }

  return { Component: BlockSign, exists: false };
};
