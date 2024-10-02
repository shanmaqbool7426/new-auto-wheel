'use client';
import React from 'react';
import {
  Box,
  Title,
} from '@mantine/core';
import FormField from '@/components/user-dashboard/FormField';
import styles from './Overview.module.css';

export default function OverView() {
  const [value, setValue] = React.useState({ value: 'january', label: 'January' });

  return (
    <Box>
      <Box className={styles.header}>
        <Title order={2}>Overview</Title>

        <Box>
          <FormField
            type="select"
            name="status"
            data={[
              { value: 'january', label: 'January' },
              { value: 'february', label: 'February' },
              { value: 'march', label: 'March' },
              { value: 'april', label: 'April' },
              { value: 'may', label: 'May' },
              { value: 'june', label: 'June' }
            ]}
            placeholder="Select Month"
            checkIconPosition="right"
            value={value ? value.value : null}
            onChange={(_value, option) => setValue(option)}
          />
        </Box>
      </Box>
    </Box>
  )
}
