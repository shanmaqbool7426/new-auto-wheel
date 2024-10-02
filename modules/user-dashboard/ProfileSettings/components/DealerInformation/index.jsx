'use client';
import React from 'react';
import { Grid, Button, Box } from '@mantine/core';
import Card from '@/components/user-dashboard/Card';
import FormField from '@/components/user-dashboard/FormField';
import useDealerInformation from './useDealerInformation';
import buttonStyles from '@/styles/user-dashboard/Button.module.css';
import styles from './DealerInformation.module.css';

export default function DealerInformation() {

  const {
    form,
    handleSubmit
  } = useDealerInformation();

  return (
    <Card title="Dealer Information">
      <form
        onSubmit={
          form.onSubmit((values) => handleSubmit(values))
        }
      >
        <Grid gutter="20px">
          <Grid.Col span={6}>
            <FormField
              label="Company Name"
              type="text"
              {...form.getInputProps('companyName')}
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
          <Grid.Col span={6}>
            <FormField
              label="I have a WhatsApp account with this number"
              type="checkbox"
              {...form.getInputProps('whatsAppOnThisNumber', { type: 'checkbox' })}
              size="14px"
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <FormField
              label="Show Email Address on my Profile"
              type="checkbox"
              {...form.getInputProps('showEmail', { type: 'checkbox' })}
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
  )
}
