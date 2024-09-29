import styles from './Inventory.module.css';
import Image from 'next/image';
import dayjs from 'dayjs';
import Badge from '@/components/user-dashboard/Badge';
import { ActionIcon, Group, Box } from '@mantine/core';
import { IconPencil, IconTrash, IconEyeOff } from '@tabler/icons-react';

const getStatusVariant = (status) => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'success';
    case 'inactive':
      return 'gray';
    case 'pending':
      return 'warning';
    case 'expired':
      return 'dark';
    case 'rejected':
      return 'danger';
    default:
      return 'default';
  }
};

export const getColumns = (onClickEdit, onClickDelete, onClickToggle) => [
  {
    accessor: 'title',
    title: 'Title',
    render: ({ make, model, images, year }) => {
      return (
        <Box className={styles.tableTitle}>
          <Box className={styles.tableTitleImage}>
            <Image src={images[0] || '/placeholder.png'} alt="vehicle" width={42} height={26} />
          </Box>
          <Box className={styles.tableTitleText}>
            <Box className={styles.tableTitleTitle}>{`${make} ${model}`}</Box>
            <Box className={styles.tableTitleModal}>{`${year}`}</Box>
          </Box>
        </Box>
      )
    },
  },
  {
    accessor: 'createdAt',
    title: 'Created',
    render: ({ createdAt }) => {
      return (
        <>
          <Box className={styles.createdDate}>
            {dayjs(createdAt).format('DD-MM-YYYY')}
          </Box>
          <Box className={styles.createdTime}>
            {dayjs(createdAt).format('hh:mm A')}
          </Box>
        </>
      )
    },
  },
  {
    accessor: 'price',
    title: 'Price',
  },
  {
    accessor: 'city',
    title: 'City',
  },
  {
    accessor: 'isFeatured',
    title: '',
    render: ({ isFeatured }) => {
      return (
        <Badge
          label={isFeatured ? 'Featured' : 'Make it Feature'}
          variant={isFeatured ? 'Rejected' : 'Info'}
          underline
          minWidth="116px"
          outlined={isFeatured}
        />
      )
    },
  },
  {
    accessor: 'status',
    title: 'Status',
    render: ({ status }) => {
      return (
        <Badge label={status} variant={getStatusVariant(status)} />
      )
    },
  },
  {
    accessor: '_id',
    title: 'Actions',
    render: ({ _id }) => {
      return (
        <Group justify='left'>
          <ActionIcon
            size={20}
            className={styles.actionButton}
            onClick={() => onClickEdit(_id)}
          >
            <IconPencil />
          </ActionIcon>

          <ActionIcon
            size={20}
            className={styles.actionButton}
            onClick={() => onClickDelete(_id)}
          >
            <IconTrash />
          </ActionIcon>

          <ActionIcon
            size={20}
            className={styles.actionButton}
            onClick={() => onClickToggle(_id)}
          >
            <IconEyeOff />
          </ActionIcon>
        </Group>
      )
    },
  },
];