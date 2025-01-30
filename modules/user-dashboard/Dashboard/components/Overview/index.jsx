'use client';
import React from 'react';
import {
  Box,
  Title,
  Group,
  Text
} from '@mantine/core';
import FormField from '@/components/user-dashboard/FormField';
import styles from './Overview.module.css';
import { overviewCardData } from './data';

export default function OverView({data:overview}) {
  const [value, setValue] = React.useState({ value: 'january', label: 'January' });

  return (
    <Box>
      <Box className={styles.header}>
        <Title className={styles.heading} order={2}>Overview</Title>

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

      <Box className={styles.cardsWrapper}>
        {overviewCardData.map(card => (
          <Box className={styles.card} key={card.id}>
            <Group gap={12}>
              <Box className={styles.cardIcon}><card.icon /></Box>
              <Box>
                <Box className={styles.cardValue}>{overview?.[card.key] || 0}</Box>
                <Box className={styles.cardText}>{card.title}</Box>
              </Box>
            </Group>
          </Box>
        ))}

      </Box>
    </Box>
  )
}
