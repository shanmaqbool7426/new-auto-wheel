import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications'; // Optional: For notifications
import { BASE_URL } from '@/constants/api-endpoints';
import { useSelector } from 'react-redux';
import { selectCurrentUser, selectToken } from '@/redux/reducers/authSlice';

export default function useChangePassword() {
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  const token = useSelector(selectToken);
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
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/user/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to change password');
      }

      // Show success notification
      showNotification({
        title: 'Success',
        message: data.message || 'Password changed successfully!',
        color: 'green',
      });

      form.reset(); // Reset form after successful change
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error changing password:', error);
      showNotification({
        title: 'Error',
        message: error.message || 'Failed to change password.',
        color: 'red',
      });
    }
  };

  return {
    form,
    handleSubmit,
    loading
  };
}