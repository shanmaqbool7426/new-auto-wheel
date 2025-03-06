import { showNotification } from '@/lib/notifications';

export const handleApiError = (error) => {
  if (error.response?.data) {
    const { message, errors } = error.response.data;
    
    if (message) {
      showNotification.error(message);
      return message;
    }
    
    if (errors) {
      const errorMessages = Object.values(errors).flat();
      errorMessages.forEach(msg => showNotification.error(msg));
      return errorMessages[0];
    }
  }

  if (error.request) {
    const message = 'Network error occurred';
    showNotification.error(message);
    return message;
  }

  const message = 'An unexpected error occurred';
  showNotification.error(message);
  return message;
};