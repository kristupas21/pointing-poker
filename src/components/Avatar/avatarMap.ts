import { AvatarId } from './types';
import { IconId } from '../Icon';

const avatarMap: Record<AvatarId, IconId> = {
  [AvatarId.Demo1]: IconId.Demo1,
  [AvatarId.Demo2]: IconId.Demo2,
  [AvatarId.Demo3]: IconId.Demo3,
  [AvatarId.Demo4]: IconId.Demo4,
};

export const getAvatar = (id: AvatarId): { iconId: IconId, exists: boolean } => {
  const iconId = avatarMap[id];

  return {
    iconId: iconId || IconId.BlockSign,
    exists: !!iconId,
  };
};
