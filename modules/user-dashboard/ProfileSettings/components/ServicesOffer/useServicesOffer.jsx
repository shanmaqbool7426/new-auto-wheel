import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';

export default function useServicesOffer() {
  const form = useForm({
    initialValues: {
      offer1: false,
      offer2: false,
      offer3: false,
      offer4: false,
    },
  });

  const handleSubmit = async (values) => {
    try {
      const servicesOffered = Object.keys(values).filter(key => values[key]);

      const response = await fetch('http://localhost:5000/api/user/services-offered', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you store the token in localStorage
        },
        body: JSON.stringify({ servicesOffered }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      // Show success notification
      showNotification({
        title: 'Success',
        message: 'Services offered updated successfully!',
        color: 'green',
      });

      console.log('Response Data:: ', data);
    } catch (error) {
      console.error('Error updating services offered:', error);
      // Show error notification
      showNotification({
        title: 'Error',
        message: 'Failed to update services offered.',
        color: 'red',
      });
    }
  };

  return {
    form,
    handleSubmit
  };
}