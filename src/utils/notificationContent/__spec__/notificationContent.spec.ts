import { NotificationLifespan } from 'state/notifications/notificationsModel';
import { User } from 'globalTypes';
import renderNotification from '../notificationContent';
import { NotificationContent } from '../types';

describe('notificationContent', () => {
  const notificationsMap = [
    { id: NotificationContent.SessionCopy },
    { id: NotificationContent.UserJoined, params: { name: 'Jack', id: 'u-id' } as User },
    { id: NotificationContent.UserLeft, params: { name: 'Jack', id: 'u-id' } as User },
  ];

  it('renders notifications', () => {
    const notifications = notificationsMap.map((item) =>
      renderNotification(item.id as any, item.params));

    expect(notifications).toEqual([
      {
        id: 'session-copy',
        lifespan: NotificationLifespan.Short,
        content: notifications[0].content,
      },
      {
        id: 'u-id-joined',
        lifespan: NotificationLifespan.Short,
        content: notifications[1].content,
      },
      {
        id: 'u-id-left',
        lifespan: NotificationLifespan.Short,
        content: notifications[2].content,
      }
    ]);
  });
});
