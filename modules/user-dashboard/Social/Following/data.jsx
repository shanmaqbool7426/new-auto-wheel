import dayjs from 'dayjs';
import Image from 'next/image';
import styles from './Followers.module.css';
import { ActionIcon, Group, Box } from '@mantine/core';
import { IconTrash, IconUserMinus } from '@tabler/icons-react';
import Badge from '@/components/user-dashboard/Badge';

export const getColumns = (onUnfollow) => [
  {
    accessor: 'fullName',
    title: 'Name',
    render: ({ fullName, accountType }) => {
      return (
        <Box className={styles.tableTitle}>
          <Box className={styles.tableTitleImage}>
            {/* <Image src="/user-profile/follower.png" alt="user" width={44} height={36} /> */}
          </Box>
          <Box className={styles.tableTitleText}>
            <Box className={styles.tableTitleTitle}>{fullName}</Box>
            <Box className={styles.tableTitleModal}>{accountType}</Box>
          </Box>
        </Box>
      )
    },
  },
  {
    accessor: 'email',
    title: 'Email',
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
    accessor: 'locationAddress',
    title: 'Location',
  },
  {
    accessor: 'isFollow',
    title: 'Status',
    render: ({ isFollow }) => {
      return (
        <Badge
          label={false ? 'Followed' : 'Follow'}
          variant={false ? 'Rejected' : 'Info'}
          underline
          minWidth="78px"
          outlined={isFollow}

        />
      )
    },
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
            onClick={() => onUnfollow(_id)}
          >
                <IconTrash />
          </ActionIcon>
        </Group>
      )
    },
  },
];
