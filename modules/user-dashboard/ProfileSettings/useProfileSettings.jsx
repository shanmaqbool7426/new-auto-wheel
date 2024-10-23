import { useEffect, useState } from 'react';
import { showNotification } from '@mantine/notifications'; // Optional: For notifications

const useProfileSettings = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/user/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you store the token in localStorage
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data = await response.json();
        setProfileData(data.data); // Assuming the API response structure has a 'data' field
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError(error.message);
        showNotification({
          title: 'Error',
          message: 'Failed to load profile data.',
          color: 'red',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  return { profileData, loading, error };
};

export default useProfileSettings;