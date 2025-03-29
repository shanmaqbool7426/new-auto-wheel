import { BASE_URL } from '@/constants/api-endpoints';
import { getLocalStorage } from '@/utils';
import { useForm } from '@mantine/form';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, setUser } from '@/redux/reducers/authSlice';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function useDealerInformation() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const form = useForm({
    initialValues: {
      dealerName: '',
      licenseNumber: '',
      abn: '',
      location: '',
      vehicleType: '',
      
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
      abn: (value) => (!value ? 'ABN is required' : null),
      location: (value) => (!value ? 'Location is required' : null),
      vehicleType: (value) => (!value ? 'Vehicle type is required' : null),
    }
  });

  const token = getLocalStorage('token');

  const handleSubmit = async (values) => {
    setLoading(true);
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
        vehicleType: values.vehicleType,
        abn: values.abn,
        workingHours: workingHours,
      };

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
      dispatch(setUser({...currentUser, ...data?.data}));
      
      // Success Alert with improved styling
      await Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Dealer information updated successfully!',
        confirmButtonColor: '#E90808',
        confirmButtonText: 'Done',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
        customClass: {
          popup: 'swal2-custom-popup',
          title: 'swal2-custom-title',
          content: 'swal2-custom-content',
        },
        background: '#FFFFFF',
        width: '400px',
        padding: '20px',
      });

    } catch (error) {
      console.error('Error updating dealer information:', error);

      // Error Alert with improved styling
      await Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to update dealer information. Please try again.',
        confirmButtonColor: '#E90808',
        confirmButtonText: 'OK',
        customClass: {
          popup: 'swal2-custom-popup',
          title: 'swal2-custom-title',
          content: 'swal2-custom-content',
          confirmButton: 'swal2-custom-confirm',
        },
        background: '#FFFFFF',
        width: '400px',
        padding: '20px',
      });
    } finally {
      setLoading(false);
    }
  };

  const initializeForm = (existingData) => {
    if (!existingData) return;

    const formData = {
      dealerName: existingData.dealerName || '',
      licenseNumber: existingData.licenseNumber || '',
      location: existingData.locationAddress || '',
      vehicleType: existingData.vehicleType || '',
      abn: existingData.abn || '',
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
    loading,
    handleSubmit,
    initializeForm,
  };
}