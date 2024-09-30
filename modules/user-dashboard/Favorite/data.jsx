import dayjs from 'dayjs';
import Image from 'next/image';
import styles from './Favorite.module.css';
import { ActionIcon, Group, Box, Text } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

export const getColumns = (onClickDelete) => [
  {
    accessor: 'post',
    title: 'Post',
    render: ({ make, model, year, defaultImage,_id }) => {
      return (
        <Box className={styles.tableTitle}>
          <Box className={styles.tableTitleImage}>
            <Image src={defaultImage} alt={`${make} ${model}`} width={42} height={26} />
          </Box>
          <Box className={styles.tableTitleText}>
          <Text className={styles.tableTitleTitle}>{`${_id?.substring(0, 6)}`}</Text>            <Text className={styles.tableTitleTitle}>{`${make} ${model} ${year}`}</Text>
          </Box>
        </Box>
      );
    },
  },
  {
    accessor: 'createdDate',
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
      );
    },
  },
  {
    accessor: 'type',
    title: 'Type',
  },
  {
    accessor: 'price',
    title: 'Price',
    render: ({ price }) => <Text>{price.toLocaleString()} PKR</Text>,
  },
  {
    accessor: 'city',
    title: 'City',
  },
  {
    accessor: '_id',
    title: 'Actions',
    textAlign: 'center',
    render: ({ _id }) => {
      return (
        <Group justify='center'>
          <ActionIcon
            size={20}
            className={styles.actionButton}
            onClick={() => onClickDelete(_id)}
          >
            <IconTrash />
          </ActionIcon>
        </Group>
      );
    },
  },
];
