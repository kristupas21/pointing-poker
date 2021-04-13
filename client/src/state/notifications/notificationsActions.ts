import { action } from 'typesafe-actions';
import { AppNotification } from './notificationsModel';
import { CLEAR_NOTIFICATION, PUSH_NOTIFICATION } from './notificationsConstants';

export const pushNotification = (item: AppNotification) => action(PUSH_NOTIFICATION, item);

export const clearNotification = (id: string) => action(CLEAR_NOTIFICATION, id);
