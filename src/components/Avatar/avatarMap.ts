import { AvatarId } from './types';
import { IconId } from '../Icon';

const avatarMap: Record<AvatarId, IconId> = {
  [AvatarId.EmojiHappy]: IconId.EmojiHappy,
  [AvatarId.EmojiSad]: IconId.EmojiSad,
};

export const getAvatar = (id: AvatarId): { iconId: IconId, exists: boolean } => {
  const iconId = avatarMap[id];

  return {
    iconId: iconId || IconId.BlockSign,
    exists: !!iconId,
  };
};
