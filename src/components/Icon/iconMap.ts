import { ReactComponent as BlockSign } from 'assets/icons/block-sign.svg';
import { ReactComponent as Settings } from 'assets/icons/settings.svg';
import { ReactComponent as Home } from 'assets/icons/home.svg';
import { ReactComponent as Menu } from 'assets/icons/menu.svg';
import { ReactComponent as Edit } from 'assets/icons/edit.svg';
import { ReactComponent as Delete } from 'assets/icons/delete.svg';
import { ReactComponent as Add } from 'assets/icons/add.svg';
import { ReactComponent as Demo1 } from 'assets/avatars/demo-avatar-1.svg';
import { ReactComponent as Demo2 } from 'assets/avatars/demo-avatar-2.svg';
import { ReactComponent as Demo3 } from 'assets/avatars/demo-avatar-3.svg';
import { ReactComponent as Demo4 } from 'assets/avatars/demo-avatar-4.svg';
import { ReactComponent as LogoCartoon } from 'assets/icons/logo.svg';
import { ReactComponent as Logo } from 'assets/icons/logo-2.svg';
import { IconId, SvgIcon } from './types';

const iconMap: Record<IconId, SvgIcon> = {
  [IconId.BlockSign]: BlockSign,
  [IconId.Settings]: Settings,
  [IconId.Home]: Home,
  [IconId.Menu]: Menu,
  [IconId.Edit]: Edit,
  [IconId.Delete]: Delete,
  [IconId.Add]: Add,
  [IconId.Demo1]: Demo1,
  [IconId.Demo2]: Demo2,
  [IconId.Demo3]: Demo3,
  [IconId.Demo4]: Demo4,
  [IconId.Logo]: Logo,
  [IconId.LogoCartoon]: LogoCartoon,
};

const getIcon = (id: IconId): SvgIcon => iconMap[id];

export default getIcon;
