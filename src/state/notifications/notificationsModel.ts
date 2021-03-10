export enum NotificationType {
  Default = 'default',
  Success = 'success',
  Error ='error',
  Warning = 'warning',
}

export enum NotificationLifespan {
  Short = 'short',
  Medium = 'medium',
  Long = 'long',
}

export interface AppNotification {
  id: string;
  lifespan?: NotificationLifespan;
  content: JSX.Element | string | number;
  type?: NotificationType;
  undoCallback?: () => void;
}

export interface NotificationsState {
  items: AppNotification[];
}
