import { NotificationLifespan } from 'state/notifications/notificationsModel';

export const LIFESPAN_TO_INTERVAL_MAP: Record<NotificationLifespan, number> = {
  [NotificationLifespan.Short]: 2000,
  [NotificationLifespan.Medium]: 4000,
  [NotificationLifespan.Long]: 6000,
};
