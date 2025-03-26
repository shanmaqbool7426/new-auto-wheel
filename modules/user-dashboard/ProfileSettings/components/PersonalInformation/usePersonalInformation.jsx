import { BASE_URL } from '@/constants/api-endpoints';
import { getLocalStorage } from '@/utils';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/reducers/authSlice';
import { selectCurrentUser } from '@/redux/reducers/authSlice';
import { useState } from 'react';

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
  const token = getLocalStorage('token');
  const currentUser = useSelector(selectCurrentUser);
  const [loading, setLoading] = useState(false);

  console.log("currentUser",currentUser)
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    console.log('Dealer Information Data:: ', values);
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/user/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token?.token?.token, // Assuming you store the token in localStorage
        },
        body: JSON.stringify(values),
      });
      setLoading(false);
      if (!response.ok) {
        throw new Error('Failed to update dealer information');
      }

      const data = await response.json();
      console.log('Dealer information updated successfully:', data?.data);
      dispatch(setUser({...currentUser, ...data?.data}));

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
    loading
  };
}