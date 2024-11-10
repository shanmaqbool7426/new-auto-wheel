'use client';
import React, { useEffect } from 'react';
import { Grid, Button, Box, Checkbox } from '@mantine/core';
import Card from '@/components/user-dashboard/Card';
import FormField from '@/components/user-dashboard/FormField';
import useDealerInformation from './useDealerInformation'; // Create a custom hook for dealer information
import buttonStyles from '@/styles/user-dashboard/Button.module.css';
import styles from './DealerInformation.module.css';

export default function DealerInformation({ profileData }) {
  const {
    form,
    handleSubmit,
  } = useDealerInformation();

  // Set initial values for the form based on profileData
  useEffect(() => {
    if (profileData) {
      // Only set values if they are not already set
      if (!form.values.dealerName) {
        form.setFieldValue('dealerName', profileData.dealerName || '');
      }
      if (!form.values.licenseNumber) {
        form.setFieldValue('licenseNumber', profileData.licenseNumber || '');
      }
      if (!form.values.locationAddress) {
        form.setFieldValue('locationAddress', profileData.locationAddress  || '');
      }
      if (!form.values.salesHours) {
        form.setFieldValue('salesHours', profileData.salesHours || '');
      }
      // Add any other fields you want to initialize
    }
  }, [profileData]);

  return (
    <Card title="Dealer Information">
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Grid gutter="20px">
          <Grid.Col span={6}>
            <FormField
              label="Dealer Name"
              type="text"
              {...form.getInputProps('dealerName')}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <FormField
              label="License Number"
              type="text"
              {...form.getInputProps('licenseNumber')}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <FormField
              label="Location"
              type="text"
              {...form.getInputProps('location')}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <FormField
              label="Sales Hours"
              type="text"
              {...form.getInputProps('salesHours')}
            />
          </Grid.Col>
          {/* Add more fields as necessary */}
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