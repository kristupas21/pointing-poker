import { State } from 'globalTypes';
import { AppNotification } from './notificationsModel';

export const getNotifications = (state: State): AppNotification[] => state.notifications.items;
