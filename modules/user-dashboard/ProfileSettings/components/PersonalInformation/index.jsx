'use client';
import React, { useEffect } from 'react';
import { Grid, Button, Box, Checkbox } from '@mantine/core';
import Card from '@/components/user-dashboard/Card';
import FormField from '@/components/user-dashboard/FormField';
import usePersonalInformation from './usePersonalInformation';
import buttonStyles from '@/styles/user-dashboard/Button.module.css';
import styles from './PersonalInformation.module.css';

export default function PersonalInformation({ profileData }) {
  const {
    form,
    handleSubmit,
  } = usePersonalInformation();

  // Set initial values for the form based on profileData
  useEffect(() => {
    if (profileData) {
      // Only set values if they are not already set
      if (!form.values.fullName) {
        form.setFieldValue('fullName', profileData.firstName || '');
      }
      if (!form.values.phoneNumber) {
        form.setFieldValue('phoneNumber', profileData.phone || '');
      }
      if (!form.values.email) {
        form.setFieldValue('email', profileData.email || '');
      }
   
        form.setFieldValue('whatsAppOnThisNumber', profileData.hasWhatsApp || false);
    
        form.setFieldValue('showEmail', profileData.showEmail || false);
      
    }
  }, [profileData]);


  console.log('>>>>>>',form.getValues(),profileData.showEmail)
  return (
    <Card title="Personal Information">
      <form
        onSubmit={form.onSubmit((values) => handleSubmit(values))}
      >
        <Grid gutter="20px">
          <Grid.Col span={4}>
            <FormField
              label="Full Name"
              type="text"
              {...form.getInputProps('fullName')}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <FormField
              label="Phone Number"
              type="text"
              {...form.getInputProps('phoneNumber')}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <FormField
              label="Email"
              type="text"
              {...form.getInputProps('email')}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Checkbox
              label="I have a WhatsApp account with this number"
              checked={form.values.whatsAppOnThisNumber}
              onChange={(event) => form.setFieldValue('whatsAppOnThisNumber', event.currentTarget.checked)}
              size="14px"
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Checkbox
              label="Show Email Address on my Profile"
              checked={form.values.showEmail}
              onChange={(event) => form.setFieldValue('showEmail', event.currentTarget.checked)}
              size="14px"
            />
          </Grid.Col>
        </Grid>

        <Box className={styles.buttonHolder}>
          <Button
            radius="20px"
            color='#1B84FF'
            fullWidth
            classNames={{
              root: buttonStyles.root,
            }}
            type="submit"
          >
            Save
          </Button>
        </Box>
      </form>
    </Card>
  );
}