import { BASE_URL } from '@/constants/api-endpoints';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';

export default function useDealerInformation() {
  const form = useForm({
    initialValues: {
      dealerName: '',
      licenseNumber: '',
      location: '',
      salesHours: '',
      // Add any other fields you want to manage
    },
  });

  const handleSubmit = async (values) => {
    console.log('Dealer Information Data:: ', values);
    try {
      const response = await fetch(`${BASE_URL}/api/user/dealer-info`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you store the token in localStorage
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to update dealer information');
      }

      const data = await response.json();
      console.log('Dealer information updated successfully:', data);

      // Show success notification
      showNotification({
        title: 'Success',
        message: 'Dealer information updated successfully!',
        color: 'green',
      });
    } catch (error) {
      console.error('Error updating dealer information:', error);

      // Show error notification
      showNotification({
        title: 'Error',
        message: 'Failed to update dealer information. Please try again.',
        color: 'red',
      });
    }
  };

  return {
    form,
    handleSubmit,
  };
}