import React, { useState } from 'react';
import { useForm } from '@mantine/form';

export default function useProfileSettings() {
  const phoneRegex = /^(\+92|0)[0-9]{10}$/;
  const emailRegex = /^\S+@\S+\.\S+$/;

  const personalInfoForm = useForm({
    mode: 'uncontrolled',
    initialValues: {
      firstName: 'JohnDoe',
      lastName: '',
      phoneNumber: '',
      email: '',
      whatsAppOnThisNumber: true,
      showEmail: false,
    },
    validate: {
      phoneNumber: (value) => phoneRegex.test(value) ? null : 'Invalid phone number.',
      email: (value) => emailRegex.test(value) ? null : 'Invalid email address',
    },
  });

  const handleSubmitPersonalInformation = (values) => {
    console.log('formDataPersonalInfo:: ', values);
  };

  return {
    personalInfoForm,
    handleSubmitPersonalInformation
  };
}
