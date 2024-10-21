import React from 'react';
import { useForm } from '@mantine/form';

export default function useDealerInformation() {
  const form = useForm({
    initialValues: {
      dealerName: '',
      licenseNumber: '',
      location: '',
      salesHours: '',
      whatsAppOnThisNumber: true,
      showEmail: true,
    },
  });

  const handleSubmit = async (values) => {
    console.log('Form Data:: ', values);
    try {
      const response = await fetch('http://localhost:5000/api/user/dealer-info', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to update dealer information');
      }

      const data = await response.json();
      console.log('Dealer information updated successfully:', data);
    } catch (error) {
      console.error('Error updating dealer information:', error);
    }
  };

  return {
    form,
    handleSubmit,
  };
}