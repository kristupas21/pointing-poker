import { FunctionComponent, SVGProps } from 'react';

export enum IconId {
  Add = 'Add',
  BlockSign = 'BlockSign',
  Delete = 'Delete',
  Edit = 'Edit',
  Home = 'Home',
  Menu = 'Menu',
  Settings = 'Settings',

  // logos

  Logo1 = 'logo-1',
  Logo2 = 'logo-2',
  Logo3 = 'logo-3',

  // avatars

  Demo1 = 'demo-1',
  Demo2 = 'demo-2',
  Demo3 = 'demo-3',
  Demo4 = 'demo-4',
  SecretE = 'secret-e',
  SecretK = 'secret-k',
}

export type SvgIcon = FunctionComponent<SVGProps<SVGSVGElement>>;
