'use client';
import React from 'react';
import { Grid, Button, Box } from '@mantine/core';
import Card from '@/components/user-dashboard/Card';
import FormField from '@/components/user-dashboard/FormField';
import usePersonalInformation from './usePersonalInformation';
import buttonStyles from './user-dashboard/button.module.css';
import styles from './PersonalInformation.module.css';

export default function PersonalInformation() {

  const {
    form,
    handleSubmit
  } = usePersonalInformation();

  return (
    <Card title="Personal Information">
      <form
        onSubmit={
          form.onSubmit((values) => handleSubmit(values))
        }
      >
        <Grid gutter="20px">
          <Grid.Col span={6}>
            <FormField
              label="First Name"
              type="text"
              {...form.getInputProps('firstName')}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <FormField
              label="Last Name"
              type="text"
              {...form.getInputProps('lastName')}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <FormField
              label="Phone Number"
              type="text"
              {...form.getInputProps('phoneNumber')}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <FormField
              label="email"
              type="text"
              {...form.getInputProps('email')}
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
