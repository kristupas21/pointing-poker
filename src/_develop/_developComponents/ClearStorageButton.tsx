import React from 'react';
import { pushNotification as pushNotificationAction } from 'state/notifications/notificationsActions';
import Button from 'components/Button/Button';
import storageService from '../../utils/storageService/storageService';
import { useMappedDispatch } from '../../utils/customHooks';
import NFC, { NotificationContent } from '../../utils/notificationContent';

const actions = {
  pushNotification: pushNotificationAction,
};

const ClearStorageButton: React.FC = () => {
  const { pushNotification } = useMappedDispatch(actions);

  const handleClick = () => {
    storageService.clearState();
    pushNotification(NFC.render(NotificationContent._StorageClear));
  };

  return (
    <Button onClick={handleClick} isOutline>
      Clear Storage
    </Button>
  );
};

export default ClearStorageButton;
