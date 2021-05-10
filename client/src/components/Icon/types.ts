import { FunctionComponent, SVGProps } from 'react';

export enum IconId {
  Add = 'Add',
  BlockSign = 'BlockSign',
  Checkmark = 'checkmark',
  CheckmarkSmall = 'checkmarkSmall',
  Delete = 'Delete',
  Edit = 'Edit',
  Home = 'Home',
  Logout = 'logout',
  Menu = 'Menu',
  Reset = 'refresh',
  Settings = 'Settings',

  // logos

  Logo1 = 'logo-1',

  // avatars

  Avatar1 = 'avatar-1',
  Avatar2 = 'avatar-2',
  Avatar3 = 'avatar-3',
  Avatar4 = 'avatar-4',
  Avatar5 = 'avatar-5',
  Avatar6 = 'avatar-6',
  Avatar7 = 'avatar-7',
  Avatar8 = 'avatar-8',
  Avatar9 = 'avatar-9',
  Avatar10 = 'avatar-10',
  Avatar11 = 'avatar-11',
  Avatar12 = 'avatar-12',
  Avatar13 = 'avatar-13',
  Avatar14 = 'avatar-14',
  Avatar15 = 'avatar-15',
  Avatar16 = 'avatar-16',
  Avatar17 = 'avatar-17',
  SecretE = 'secret-e',
  SecretK = 'secret-k',
}

export type SvgIcon = FunctionComponent<SVGProps<SVGSVGElement>>;
