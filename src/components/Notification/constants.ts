import { NotificationLifespan } from 'state/notifications/notificationsModel';
import { ProgressBarInterval } from 'components/ProgressBar';

export const LIFESPAN_TO_INTERVAL_MAP: Record<NotificationLifespan, ProgressBarInterval> = {
  [NotificationLifespan.Short]: 2000,
  [NotificationLifespan.Medium]: 4000,
  [NotificationLifespan.Long]: 6000,
};
