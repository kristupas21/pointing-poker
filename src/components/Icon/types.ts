import { FunctionComponent, SVGProps } from 'react';

export enum IconId {
  Add = 'Add',
  BlockSign = 'BlockSign',
  Delete = 'Delete',
  Edit = 'Edit',
  Home = 'Home',
  Menu = 'Menu',
  Settings = 'Settings',
  Logo = 'Logo',

  // avatars

  Demo1 = 'demo-1',
  Demo2 = 'demo-2',
  Demo3 = 'demo-3',
  Demo4 = 'demo-4',
}

export type SvgIcon = FunctionComponent<SVGProps<SVGSVGElement>>;
