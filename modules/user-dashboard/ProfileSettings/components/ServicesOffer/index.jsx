'use client';
import React from 'react';
import { Grid, Button, Box } from '@mantine/core';
import Card from '@/components/user-dashboard/Card';
import FormField from '@/components/user-dashboard/FormField';
import useServicesOffer from './useServicesOffer';
import buttonStyles from '@/styles/user-dashboard/button.module.css';
import styles from './ServicesOffer.module.css';

export default function ServicesOffer() {

  const {
    form,
    handleSubmit
  } = useServicesOffer();

  return (
    <Card title="Services Offer">
      <form
        onSubmit={
          form.onSubmit((values) => handleSubmit(values))
        }
      >
        <Grid gutter="20px">
          <Grid.Col span={12}>
            <FormField
              label="Cassette Player"
              type="checkbox"
              {...form.getInputProps('offer1', { type: 'checkbox' })}
              size="14px"
              color="#E90808"
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <FormField
              label="Cassette Player"
              type="checkbox"
              {...form.getInputProps('offer2', { type: 'checkbox' })}
              size="14px"
              color="#E90808"
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <FormField
              label="Cassette Player"
              type="checkbox"
              {...form.getInputProps('offer3', { type: 'checkbox' })}
              size="14px"
              color="#E90808"
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <FormField
              label="Cassette Player"
              type="checkbox"
              {...form.getInputProps('offer4', { type: 'checkbox' })}
              size="14px"
              color="#E90808"
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
