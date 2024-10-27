import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';

import { submitFormData } from "@/services/forms";
import { BASE_URL } from '@/constants/api-endpoints';

export default function useProfileInformation() {

  let token = localStorage.getItem('token')
  token = JSON.parse(token)


  const phoneRegex = /^(\+92|0)[0-9]{10}$/;
  const emailRegex = /^\S+@\S+\.\S+$/;
const [bgfile, setBgFile] = useState('')
const [profileFile, setProfileFile] = useState('')
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      companyName: '',
      licenseNumber: '',
      location: '',
      salesHours: '',
    },
  });

  const handleSubmit = (values) => {
    console.log('Form Data:: ', values);
  };


  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('images', file);
      const uploadUrl = `${BASE_URL}/upload-image`;
      
      try {
        // First upload the image
        const uploadResponse = await fetch(uploadUrl, {
          method: 'POST',
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error('Failed to upload image');
        }

        const uploadedImageUrls = await uploadResponse.json();
        const imageUrl = uploadedImageUrls?.data[0];

        // Then update the user profile with the new image URL
        const updateProfileUrl = `${BASE_URL}/api/user/update-profile-images`;
        const updateResponse = await fetch(updateProfileUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token.token.token // Assuming you have access to the token
          },
          body: JSON.stringify({
            [event.target.name === 'profileFileInput' ? 'profileImage' : 'bannerImage']: imageUrl
          })
        });

        if (!updateResponse.ok) {
          throw new Error('Failed to update profile images');
        }

        const updatedProfile = await updateResponse.json();
        
        // Update local state
        if (event.target.name === 'profileFileInput') {
          setProfileFile(imageUrl);
          notifications.show({
            title: 'Success',
            message: 'Profile image updated successfully',
            color: 'green'
          });
        } else {
          setBgFile(imageUrl);
          notifications.show({
            title: 'Success',
            message: 'Banner image updated successfully',
            color: 'green'
          });
        }

      } catch (error) {
        console.error('Error handling image:', error);
        notifications.show({
          title: 'Error',
          message: error.message || 'Failed to update image',
          color: 'red'
        });
      }
    }
  };

  return {
    form,
    bgfile,
    profileFile,
    handleImageUpload,
    handleSubmit
  };
}
