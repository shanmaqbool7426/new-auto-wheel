import React from 'react';
import { useForm } from '@mantine/form';

export default function usePersonalInformation() {

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      offer1: false,
      offer2: false,
      offer3: false,
      offer4: false,
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
