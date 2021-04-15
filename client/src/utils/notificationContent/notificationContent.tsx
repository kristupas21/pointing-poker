import React from 'react';
import { AppNotification, NotificationLifespan } from 'state/notifications/notificationsModel';
import { User } from 'globalTypes';
import BaseMessage from './contents/BaseMessage';
import UserMessage from './contents/UserMessage';
import { NotificationContent } from './types';

interface Renderer {
  render(id: NotificationContent.SessionCopy |
             NotificationContent.HiddenFeats |
             NotificationContent._StorageClear
  ): AppNotification,
  render(id: NotificationContent.UserLeft |
             NotificationContent.UserShowVotes |
             NotificationContent.UserResetRound |
             NotificationContent.UserChangeVote,
    params: User
  ): AppNotification,
}

const renderer: Renderer = {
  render(id, params?) {
    switch (id) {
      case NotificationContent.SessionCopy:
        return {
          id: 'session-copy',
          lifespan: NotificationLifespan.Short,
          content: <BaseMessage message="notifications.sessionIdCopied" />,
        };
      case NotificationContent.HiddenFeats:
        return {
          id: 'hidden-feats',
          lifespan: NotificationLifespan.Medium,
          content: <BaseMessage message="notifications.hiddenFeats" />
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
          id: `${params.id}-reset-round`,
          lifespan: NotificationLifespan.Medium,
          content: <UserMessage name={params.name} message="notifications.userResetRound" />
        };
      case NotificationContent.UserChangeVote:
        return {
          id: `${params.id}-change-vote`,
          lifespan: NotificationLifespan.Short,
          content: <UserMessage name={params.name} message="notifications.userChangeVote" />
        };
      case NotificationContent._StorageClear:
        return {
          id: 'clear-storage',
          lifespan: NotificationLifespan.Short,
          content: <BaseMessage message="notifications.storageCleared" />
        };
      default:
        return null;
    }
  }
};

export default renderer.render;
