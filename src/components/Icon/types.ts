import { FunctionComponent, SVGProps } from 'react';

export enum IconId {
  Add = 'Add',
  BlockSign = 'BlockSign',
  Delete = 'Delete',
  Edit = 'Edit',
  EmojiHappy = 'EmojiHappy',
  EmojiSad = 'EmojiSad',
  Home = 'Home',
  Menu = 'Menu',
  Settings = 'Settings',
}

export type SvgIcon = FunctionComponent<SVGProps<SVGSVGElement>>;
