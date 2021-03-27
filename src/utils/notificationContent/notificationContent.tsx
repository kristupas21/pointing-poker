import React from 'react';
import { AppNotification, NotificationLifespan } from 'state/notifications/notificationsModel';
import { User } from 'globalTypes';
import SessionCopy from './contents/SessionCopy';
import UserMessage from './contents/UserMessage';
import { NotificationContent } from './types';

interface Renderer {
  render(id: NotificationContent.SessionCopy): AppNotification,
  render(id: NotificationContent.UserLeft, params: User): AppNotification,
  render(id: NotificationContent.UserJoined, params: User): AppNotification,
  render(id: NotificationContent.UserShowVotes, params: User): AppNotification,
  render(id: NotificationContent.UserResetRound, params: User): AppNotification,
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
          content: <UserMessage name={params.name} message="notifications.userJoined" />
        };
      case NotificationContent.UserLeft:
        return {
          id: `${params.id}-left`,
          lifespan: NotificationLifespan.Short,
          content: <UserMessage name={params.name} message="notifications.userLeft" />
        };
      case NotificationContent.UserShowVotes:
        return {
          id: `${params.id}-show-votes`,
          lifespan: NotificationLifespan.Medium,
          content: <UserMessage name={params.name} message="notifications.userShowVotes" />
        };
      case NotificationContent.UserResetRound:
        return {
          id: `${params.id}-show-votes`,
          lifespan: NotificationLifespan.Medium,
          content: <UserMessage name={params.name} message="notifications.userResetRound" />
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
