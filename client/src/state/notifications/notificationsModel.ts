export enum NotificationType {
  Default = 'default',
  Error ='error',
  Success = 'success',
  Warning = 'warning',
}

export enum NotificationLifespan {
  Long = 'long',
  Medium = 'medium',
  Short = 'short',
}

export interface AppNotification {
  content: JSX.Element | string | number;
  id: string;
  lifespan?: NotificationLifespan;
  type?: NotificationType;
  undoCallback?: () => void;
}

export interface NotificationsState {
  items: AppNotification[];
}
