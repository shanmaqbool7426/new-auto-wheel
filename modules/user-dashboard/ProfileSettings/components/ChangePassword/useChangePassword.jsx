import React from 'react';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications'; // Optional: For notifications

export default function useChangePassword() {
  const form = useForm({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validate: {
      newPassword: (value) => (value.length < 6 ? 'Password must be at least 6 characters long' : null),
      confirmPassword: (value, values) => (value !== values.newPassword ? 'Passwords do not match' : null),
    },
  });

  const handleSubmit = async (values) => {
    try {
      const response = await fetch('http://localhost:5000/api/user/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      // Optional: Show a success notification
      showNotification({
        title: 'Success',
        message: 'Password changed successfully!',
        color: 'green',
      });

      console.log('Response Data:: ', data);
    } catch (error) {
      console.error('Error changing password:', error);
      // Optional: Show an error notification
      showNotification({
        title: 'Error',
        message: 'Failed to change password.',
        color: 'red',
      });
    }
  };

  return {
    form,
    handleSubmit
  };
}