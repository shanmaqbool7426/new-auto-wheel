'use client';
import React, { useEffect } from 'react';
import { Grid, Button, Box, Checkbox } from '@mantine/core';
import Card from '@/components/user-dashboard/Card';
import useServicesOffer from './useServicesOffer';
import buttonStyles from '@/styles/user-dashboard/Button.module.css';
import styles from './ServicesOffer.module.css';

export default function ServicesOffer({ profileData }) {
  const {
    form,
    handleSubmit
  } = useServicesOffer();

  // Set initial values for the form based on profileData
  useEffect(() => {
    if (profileData) {
      form.setValues({
        offer1: profileData.servicesOffered.includes('offer1'),
        offer2: profileData.servicesOffered.includes('offer2'),
        offer3: profileData.servicesOffered.includes('offer3'),
        offer4: profileData.servicesOffered.includes('offer4'),
      });
    }
  }, [profileData]); // Ensure to include profileData and form in the dependency array


  console.log('dataaaa',form.getValues())
  return (
    <Card title="Services Offer">
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Grid gutter="20px">
          <Grid.Col span={12}>
            <Checkbox
              label="Offer 1"
              checked={form.values.offer1} // Bind to form state
              onChange={(event) => form.setFieldValue('offer1', event.currentTarget.checked)} // Update form state
              size="14px"
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Checkbox
              label="Offer 2"
              checked={form.values.offer2} // Bind to form state
              onChange={(event) => form.setFieldValue('offer2', event.currentTarget.checked)} // Update form state
              size="14px"
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Checkbox
              label="Offer 3"
              checked={form.values.offer3} // Bind to form state
              onChange={(event) => form.setFieldValue('offer3', event.currentTarget.checked)} // Update form state
              size="14px"
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Checkbox
              label="Offer 4"
              checked={form.values.offer4} // Bind to form state
              onChange={(event) => form.setFieldValue('offer4', event.currentTarget.checked)} // Update form state
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