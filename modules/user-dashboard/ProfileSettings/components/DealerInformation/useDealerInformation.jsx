import { BASE_URL } from '@/constants/api-endpoints';
import { getLocalStorage } from '@/utils';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';

export default function useDealerInformation() {
  const form = useForm({
    initialValues: {
      dealerName: '',
      licenseNumber: '',
      location: '',
      
      mondayEnabled: true,
      mondayStart: '8:30 AM',
      mondayEnd: '5:30 PM',
      
      tuesdayEnabled: true,
      tuesdayStart: '8:30 AM',
      tuesdayEnd: '5:30 PM',
      
      wednesdayEnabled: true,
      wednesdayStart: '8:30 AM',
      wednesdayEnd: '5:30 PM',
      
      thursdayEnabled: true,
      thursdayStart: '8:30 AM',
      thursdayEnd: '5:30 PM',
      
      fridayEnabled: true,
      fridayStart: '8:30 AM',
      fridayEnd: '5:30 PM',
      
      saturdayEnabled: true,
      saturdayStart: '8:30 AM',
      saturdayEnd: '12:00 PM',
      
      sundayEnabled: true,
      sundayStart: '8:30 AM',
      sundayEnd: '12:00 PM',
    },

    validate: {
      dealerName: (value) => (!value ? 'Dealer name is required' : null),
      licenseNumber: (value) => (!value ? 'License number is required' : null),
      location: (value) => (!value ? 'Location is required' : null),
    }
  });

  const token = getLocalStorage('token');

  const handleSubmit = async (values) => {
    try {
      const workingHours = {};
      
      ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].forEach(day => {
        workingHours[day] = {
          isOpen: values[`${day}Enabled`],
          start: values[`${day}Enabled`] ? values[`${day}Start`] : null,
          end: values[`${day}Enabled`] ? values[`${day}End`] : null,
        };
      });

      const apiData = {
        dealerName: values.dealerName,
        licenseNumber: values.licenseNumber,
        location: values.location,
        workingHours: workingHours,
      };

      console.log('Dealer Information Data:: ', apiData);

      const response = await fetch(`${BASE_URL}/api/user/dealer-info`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token.token.token,
        },
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        throw new Error('Failed to update dealer information');
      }

      const data = await response.json();
      
      showNotification({
        title: 'Success',
        message: 'Dealer information updated successfully!',
        color: 'green',
      });
    } catch (error) {
      console.error('Error updating dealer information:', error);

      showNotification({
        title: 'Error',
        message: 'Failed to update dealer information. Please try again.',
        color: 'red',
      });
    }
  };

  const initializeForm = (existingData) => {
    if (!existingData) return;

    const formData = {
      dealerName: existingData.dealerName || '',
      licenseNumber: existingData.licenseNumber || '',
      location: existingData.locationAddress || '',
    };

    if (existingData.workingHours) {
      Object.entries(existingData.workingHours).forEach(([day, hours]) => {
        formData[`${day}Enabled`] = hours.isOpen;
        formData[`${day}Start`] = hours.start || '8:30 AM';
        formData[`${day}End`] = hours.end || '5:30 PM';
      });
    }

    form.setValues(formData);
  };

  return {
    form,
    handleSubmit,
    initializeForm,
  };
}