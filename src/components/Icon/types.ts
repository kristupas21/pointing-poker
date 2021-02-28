import { FunctionComponent, SVGProps } from 'react';

export enum IconId {
  BlockSign = 'BlockSign',
  EmojiHappy = 'EmojiHappy',
  EmojiSad = 'EmojiSad',
  Settings = 'Settings',
  Home = 'Home',
  Menu = 'Menu',
}

export type SvgIcon = FunctionComponent<SVGProps<SVGSVGElement>>;
