import React from 'react';
import { useForm } from '@mantine/form';

export default function usePersonalInformation() {
  const phoneRegex = /^(\+92|0)[0-9]{10}$/;
  const emailRegex = /^\S+@\S+\.\S+$/;

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      whatsAppOnThisNumber: true,
      showEmail: true,
    },
    validate: {
      phoneNumber: (value) => phoneRegex.test(value) ? null : 'Invalid phone number.',
      email: (value) => emailRegex.test(value) ? null : 'Invalid email address',
    },
  });

  const handleSubmit = (values) => {
    console.log('Form Data:: ', values);
  };

  return {
    form,
    handleSubmit
  };
}
