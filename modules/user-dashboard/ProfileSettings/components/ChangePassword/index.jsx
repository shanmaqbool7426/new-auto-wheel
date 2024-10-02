'use client';
import React from 'react';
import { Grid, Button, Box } from '@mantine/core';
import Card from '@/components/user-dashboard/Card';
import FormField from '@/components/user-dashboard/FormField';
import useChangePassword from './useChangePassword';
import buttonStyles from '@/styles/user-dashboard/Button.module.css';
import styles from './ChangePassword.module.css';

export default function ChangePassword() {

  const {
    form,
    handleSubmit
  } = useChangePassword();

  return (
    <Card title="Change Password">
      <form
        onSubmit={
          form.onSubmit((values) => handleSubmit(values))
        }
      >
        <Grid gutter="20px">
          <Grid.Col span={12}>
            <FormField
              label="Current Password"
              type="password"
              {...form.getInputProps('currentPassword')}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <FormField
              label="New Password"
              type="password"
              {...form.getInputProps('newPassword')}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <FormField
              label="New Password"
              type="password"
              {...form.getInputProps('confirmPassword')}
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
