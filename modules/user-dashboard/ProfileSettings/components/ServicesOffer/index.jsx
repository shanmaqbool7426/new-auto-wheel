'use client';
import React, { useEffect } from 'react';
import { Grid, Button, Box, Checkbox, SimpleGrid } from '@mantine/core';
import Card from '@/components/user-dashboard/Card';
import useServicesOffer from './useServicesOffer';
import buttonStyles from '@/styles/user-dashboard/Button.module.css';
import styles from './ServicesOffer.module.css';

// Define all available services
const availableServices = [
  'New & Used Vehicle',
  'Trade-In Services',
  'Pre-Order & Custom Orders',
  'Pre-Purchase Inspection',
  'Certified Used Vehicles',
  'Roadworthy Certificates (RWC)',
  'Auto Loan Assistance',
  'Car Leasing Options',
  'Vehicle Insurance',
  'Scheduled Maintenance',
  'Mechanical Repairs',
  'Body & Paint Services',
  'Title Transfer Assistance',
  'Vehicle Registration Services',
  'Number Plate Customization',
  'On-Site & Home Test Drives',
  'Nationwide Delivery',
  'Concierge Services',
  'Guaranteed Title'
];

export default function ServicesOffer({ profileData }) {
  const {
    form,
    handleSubmit
  } = useServicesOffer();

  // Set initial values for the form based on profileData
  useEffect(() => {
    if (profileData && profileData.servicesOffered) {
      // Create an object with all services set to false initially
      const initialValues = {};
      availableServices.forEach(service => {
        // Check if this service is in the user's profile
        initialValues[service] = profileData.servicesOffered.includes(service);
      });
      
      form.setValues(initialValues);
    }
  }, [profileData]); // Ensure to include profileData in the dependency array

  return (
    <Card title="Services Offer">
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
          {availableServices.map((service) => (
            <Checkbox
              key={service}
              color="#E90808"
              label={service}
              checked={form.values[service] || false}
              onChange={(event) => form.setFieldValue(service, event.currentTarget.checked)}
              size="md"
              styles={{
                label: { fontSize: '14px' }
              }}
            />
          ))}
        </SimpleGrid>

        <Box className={styles.buttonHolder} mt="xl">
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