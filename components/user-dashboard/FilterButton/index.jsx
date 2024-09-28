import React from 'react';
import { Button } from '@mantine/core';
import styles from './FilterButton.module.css';
import { IconFilterFilled } from '@tabler/icons-react';

export default function FilterButton({ onClick }) {
  return (
    <Button
      onClick={onClick}
      rightSection={<IconFilterFilled />}
      color='#FFFFFF'
      radius='20px'
      classNames={styles}
    >
      Filter
    </Button>
  )
}
