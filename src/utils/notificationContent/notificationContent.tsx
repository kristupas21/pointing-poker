import React from 'react';
import { AppNotification, NotificationLifespan } from 'state/notifications/notificationsModel';
import { User } from 'types/global';
import SessionCopy from './contents/SessionCopy';
import UserPresence from './contents/UserPresence';
import { NotificationContent } from './types';

interface Renderer {
  render(id: NotificationContent.SessionCopy): AppNotification,
  render(id: NotificationContent.UserLeft, params: User): AppNotification,
  render(id: NotificationContent.UserJoined, params: User): AppNotification,
  render(id: NotificationContent._StorageClear): AppNotification,
}

const renderer: Renderer = {
  render(id, params?) {
    switch (id) {
      case NotificationContent.SessionCopy:
        return {
          id: 'session-copy',
          lifespan: NotificationLifespan.Short,
          content: <SessionCopy />,
        };
      case NotificationContent.UserJoined:
        return {
          id: `${params.id}-joined`,
          lifespan: NotificationLifespan.Short,
          content: <UserPresence name={params.name} />
        };
      case NotificationContent.UserLeft:
        return {
          id: `${params.id}-left`,
          lifespan: NotificationLifespan.Short,
          content: <UserPresence name={params.name} hasLeft />
        };
      case NotificationContent._StorageClear:
        return {
          id: 'clear-storage',
          lifespan: NotificationLifespan.Short,
          content: <span>Storage Cleared!</span>
        };
      default:
        return null;
    }
  }
};

export default renderer.render;
