import { ReactComponent as BlockSign } from 'assets/icons/block-sign.svg';
import { ReactComponent as Settings } from 'assets/icons/settings.svg';
import { ReactComponent as Home } from 'assets/icons/home.svg';
import { ReactComponent as Menu } from 'assets/icons/menu.svg';
import { ReactComponent as Edit } from 'assets/icons/edit.svg';
import { ReactComponent as Delete } from 'assets/icons/delete.svg';
import { ReactComponent as Add } from 'assets/icons/add.svg';
import { ReactComponent as Avatar1 } from 'assets/avatars/avatar-1.svg';
import { ReactComponent as Avatar2 } from 'assets/avatars/avatar-2.svg';
import { ReactComponent as Avatar3 } from 'assets/avatars/avatar-3.svg';
import { ReactComponent as Avatar4 } from 'assets/avatars/avatar-4.svg';
import { ReactComponent as Avatar5 } from 'assets/avatars/avatar-5.svg';
import { ReactComponent as Avatar6 } from 'assets/avatars/avatar-6.svg';
import { ReactComponent as Avatar7 } from 'assets/avatars/avatar-7.svg';
import { ReactComponent as Avatar8 } from 'assets/avatars/avatar-8.svg';
import { ReactComponent as Avatar9 } from 'assets/avatars/avatar-9.svg';
import { ReactComponent as Avatar10 } from 'assets/avatars/avatar-10.svg';
import { ReactComponent as Avatar11 } from 'assets/avatars/avatar-11.svg';
import { ReactComponent as Avatar12 } from 'assets/avatars/avatar-12.svg';
import { ReactComponent as Avatar13 } from 'assets/avatars/avatar-13.svg';
import { ReactComponent as Avatar14 } from 'assets/avatars/avatar-14.svg';
import { ReactComponent as Avatar15 } from 'assets/avatars/avatar-15.svg';
import { ReactComponent as Avatar16 } from 'assets/avatars/avatar-16.svg';
import { ReactComponent as Avatar17 } from 'assets/avatars/avatar-17.svg';
import { ReactComponent as SecretE } from 'assets/avatars/secret-avatar-e.svg';
import { ReactComponent as SecretK } from 'assets/avatars/secret-avatar-k.svg';
import { ReactComponent as Logo1 } from 'assets/icons/logo.svg';
import { ReactComponent as Reset } from 'assets/icons/refresh.svg';
import { ReactComponent as Logout } from 'assets/icons/logout.svg';
import { ReactComponent as Checkmark } from 'assets/icons/checkmark.svg';
import { ReactComponent as CheckmarkSmall } from 'assets/icons/checkmark-small.svg';
import { IconId, SvgIcon } from './types';

const iconMap: Record<IconId, SvgIcon> = {
  [IconId.BlockSign]: BlockSign,
  [IconId.Settings]: Settings,
  [IconId.Home]: Home,
  [IconId.Menu]: Menu,
  [IconId.Edit]: Edit,
  [IconId.Delete]: Delete,
  [IconId.Add]: Add,
  [IconId.Avatar1]: Avatar1,
  [IconId.Avatar2]: Avatar2,
  [IconId.Avatar3]: Avatar3,
  [IconId.Avatar4]: Avatar4,
  [IconId.Avatar5]: Avatar5,
  [IconId.Avatar6]: Avatar6,
  [IconId.Avatar7]: Avatar7,
  [IconId.Avatar8]: Avatar8,
  [IconId.Avatar9]: Avatar9,
  [IconId.Avatar10]: Avatar10,
  [IconId.Avatar11]: Avatar11,
  [IconId.Avatar12]: Avatar12,
  [IconId.Avatar13]: Avatar13,
  [IconId.Avatar14]: Avatar14,
  [IconId.Avatar15]: Avatar15,
  [IconId.Avatar16]: Avatar16,
  [IconId.Avatar17]: Avatar17,
  [IconId.Logo1]: Logo1,
  [IconId.SecretE]: SecretE,
  [IconId.SecretK]: SecretK,
  [IconId.Reset]: Reset,
  [IconId.Logout]: Logout,
  [IconId.Checkmark]: Checkmark,
  [IconId.CheckmarkSmall]: CheckmarkSmall,
};

const getIcon = (id: IconId): SvgIcon => iconMap[id];

export default getIcon;
