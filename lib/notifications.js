import { notifications } from '@mantine/notifications';

export const showNotification = {
  success: (message) => {
    notifications.show({
      title: 'Success',
      message,
      color: 'green',
    });
  },
  error: (message) => {
    notifications.show({
      title: 'Error',
      message,
      color: 'red',
    });
  },
};