import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import { submitFormData } from "@/services/forms";

export default function useProfileInformation() {
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
    console.log('>>>>>>>',event.target.name)
    const file = event.target.files[0];
    console.log('file', file);
    if (file) {
      const formData = new FormData();
      formData.append('images', file); // Append the file to the FormData
      const uploadUrl = 'http://localhost:5000/upload-image'; // Absolute URL to avoid Next.js routing issues
      try {
        const response = await fetch(uploadUrl, {
          method: 'POST',
          body: formData, // Send the FormData as the body
          headers: {
            // 'Content-Type': 'multipart/form-data' // Do not set Content-Type for FormData, the browser will set it automatically
          },
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const uploadedImageUrls = await response.json(); // Assuming the response is in JSON format
        const url=uploadedImageUrls?.data[0]
        event.target.name=='profileFileInput' &&  setProfileFile(url) || setBgFile(url)
      } catch (error) {
        console.error('Error uploading image:', error);
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
