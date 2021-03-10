import { State } from 'types/global';
import { AppNotification } from './notificationsModel';

export const getNotifications = (state: State): AppNotification[] => state.notifications.items;
