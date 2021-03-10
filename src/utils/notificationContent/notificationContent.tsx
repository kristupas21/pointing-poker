import React from 'react';
import { NotificationContent } from './types';
import { User } from '../../types/global';
import { AppNotification, NotificationLifespan } from '../../state/notifications/notificationsModel';
import SessionCopy from './contents/SessionCopy';
import UserLeft from './contents/UserLeft';

interface Renderer {
  render(id: NotificationContent.SessionCopy): AppNotification,
  render(id: NotificationContent.UserLeft, params: User): AppNotification,
  render(id: NotificationContent._StorageClear): AppNotification,
}

const NFC: Renderer = {
  render(id, params?) {
    switch (id) {
      case NotificationContent.SessionCopy:
        return {
          id: 'session-copy',
          lifespan: NotificationLifespan.Short,
          content: <SessionCopy />,
        };
      case NotificationContent.UserLeft:
        return {
          id: params.id,
          lifespan: NotificationLifespan.Medium,
          content: <UserLeft name={params.name} />
        };
      case NotificationContent._StorageClear:
        return {
          id: 'drop-db',
          lifespan: NotificationLifespan.Short,
          content: <span>Storage Cleared!</span>
        };
      default:
        return null;
    }
  }
};

export default NFC;
