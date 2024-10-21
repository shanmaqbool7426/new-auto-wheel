import React from 'react';
import { useForm } from '@mantine/form';

export default function usePersonalInformation() {

  const emailRegex = /^\S+@\S+\.\S+$/;

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      whatsAppOnThisNumber: true,
      showEmail: true,
    },
    validate: {
      email: (value) => emailRegex.test(value) ? null : 'Invalid email address',
    },
  });

  const handleSubmit = async (values) => {
    console.log('Form Data:: ', values);
    try {
      const response = await fetch('http://localhost:5000/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to update personal information');
      }

      const data = await response.json();
      console.log('Personal information updated successfully:', data);
    } catch (error) {
      console.error('Error updating personal information:', error);
    }
  };

  return {
    form,
    handleSubmit,
  };
}