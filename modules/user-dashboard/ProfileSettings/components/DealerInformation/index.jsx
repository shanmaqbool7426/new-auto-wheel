'use client';
import React from 'react';
import { Grid, Button, Box, Switch, Select, Group, Text } from '@mantine/core';
import Card from '@/components/user-dashboard/Card';
import FormField from '@/components/user-dashboard/FormField';
import buttonStyles from '@/styles/user-dashboard/Button.module.css';
import styles from './DealerInformation.module.css';
import useDealerInformation from './useDealerInformation';
import { useEffect } from 'react';

export default function DealerInformation({ profileData }) {
  const {
    form,
    handleSubmit,
    initializeForm,
  } = useDealerInformation();

  useEffect(() => {
    if (profileData) {
      initializeForm(profileData);
    }
  }, [profileData]);

  const timeOptions = [
    '12:00 AM', '12:30 AM', '1:00 AM', '1:30 AM', '2:00 AM', '2:30 AM',
    '3:00 AM', '3:30 AM', '4:00 AM', '4:30 AM', '5:00 AM', '5:30 AM',
    '6:00 AM', '6:30 AM', '7:00 AM', '7:30 AM', '8:00 AM', '8:30 AM',
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
    '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM',
  ].map(time => ({ value: time, label: time }));

  const days = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' },
  ];

  return (
    <Card title="Dealer Information">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid gutter="20px">
          <Grid.Col span={6}>
            <FormField
              label="Dealer Name"
              placeholder="Enter dealer name"
              {...form.getInputProps('dealerName')}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <FormField
              label="License Number"
              placeholder="Enter license number"
              {...form.getInputProps('licenseNumber')}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <FormField
              label="Location"
              placeholder="Enter location"
              {...form.getInputProps('location')}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <Box className={styles.workingHoursSection}>
              <Text className={styles.sectionTitle}>Working Hours</Text>
              
              {days.map((day) => (
                <Box key={day.key} className={styles.dayRow}>
                  <Group position="apart" align="center" noWrap>
                    <Box className={styles.dayInfo}>
                      <Text className={styles.dayLabel}>{day.label}</Text>
                      <Switch
                        checked={form.values[`${day.key}Enabled`]}
                        onChange={(event) => {
                          form.setFieldValue(`${day.key}Enabled`, event.currentTarget.checked);
                        }}
                        className={styles.dayToggle}
                        size="md"
                        color="blue"
                      />
                    </Box>
                    
                    {form.values[`${day.key}Enabled`] && (
                      <Group className={styles.timeSelectors} noWrap>
                        <Select
                          data={timeOptions}
                          value={form.values[`${day.key}Start`]}
                          onChange={(value) => form.setFieldValue(`${day.key}Start`, value)}
                          placeholder="Start Time"
                          searchable
                          className={styles.timeSelect}
                          size="sm"
                        />
                        <Text size="sm" className={styles.timeSeperator}>to</Text>
                        <Select
                          data={timeOptions}
                          value={form.values[`${day.key}End`]}
                          onChange={(value) => form.setFieldValue(`${day.key}End`, value)}
                          placeholder="End Time"
                          searchable
                          className={styles.timeSelect}
                          size="sm"
                        />
                      </Group>
                    )}
                  </Group>
                </Box>
              ))}
            </Box>
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
            size="md"
          >
            Save Changes
          </Button>
        </Box>
      </form>
    </Card>
  );
}