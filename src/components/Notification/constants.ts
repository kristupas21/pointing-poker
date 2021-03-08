import { MotionProps } from 'framer-motion';
import { NotificationLifespan } from '../../state/notifications/notificationsModel';
import { ProgressBarInterval } from '../ProgressBar';

export const LIFESPAN_TO_INTERVAL_MAP: Record<NotificationLifespan, ProgressBarInterval> = {
  [NotificationLifespan.Short]: 2000,
  [NotificationLifespan.Medium]: 4000,
  [NotificationLifespan.Long]: 6000,
};

export const notificationMotionProps: MotionProps = {
  initial: { x: '100%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '100%', opacity: 0 },
};
