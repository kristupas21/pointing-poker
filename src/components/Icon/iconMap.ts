import { ReactComponent as EmojiHappy } from 'assets/icons/emoji-happy.svg';
import { ReactComponent as EmojiSad } from 'assets/icons/emoji-sad.svg';
import { ReactComponent as BlockSign } from 'assets/icons/block-sign.svg';
import { ReactComponent as Settings } from 'assets/icons/settings.svg';
import { ReactComponent as Home } from 'assets/icons/home.svg';
import { ReactComponent as Menu } from 'assets/icons/menu.svg';
import { ReactComponent as Edit } from 'assets/icons/edit.svg';
import { ReactComponent as Delete } from 'assets/icons/delete.svg';
import { ReactComponent as Add } from 'assets/icons/add.svg';
import { IconId, SvgIcon } from './types';

const iconMap: Record<IconId, SvgIcon> = {
  [IconId.BlockSign]: BlockSign,
  [IconId.EmojiHappy]: EmojiHappy,
  [IconId.EmojiSad]: EmojiSad,
  [IconId.Settings]: Settings,
  [IconId.Home]: Home,
  [IconId.Menu]: Menu,
  [IconId.Edit]: Edit,
  [IconId.Delete]: Delete,
  [IconId.Add]: Add,
};

const getIcon = (id: IconId): SvgIcon => iconMap[id];

export default getIcon;
