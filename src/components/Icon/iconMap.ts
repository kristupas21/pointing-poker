import { ReactComponent as EmojiHappy } from '../../assets/icons/emoji-happy.svg';
import { ReactComponent as EmojiSad } from '../../assets/icons/emoji-sad.svg';
import { ReactComponent as BlockSign } from '../../assets/icons/block-sign.svg';
import { ReactComponent as Settings } from '../../assets/icons/settings.svg';
import { ReactComponent as Home } from '../../assets/icons/home.svg';
import { IconId, SvgIcon } from './types';

const iconMap: Record<IconId, SvgIcon> = {
  [IconId.BlockSign]: BlockSign,
  [IconId.EmojiHappy]: EmojiHappy,
  [IconId.EmojiSad]: EmojiSad,
  [IconId.Settings]: Settings,
  [IconId.Home]: Home,
};

const getIcon = (id: IconId): SvgIcon => iconMap[id];

export default getIcon;
