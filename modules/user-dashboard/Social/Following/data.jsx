import dayjs from 'dayjs';
import Image from 'next/image';
import styles from './Followers.module.css';
import { ActionIcon, Group, Box } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import Badge from '@/components/user-dashboard/Badge';

export const getColumns = (onClickDelete) => [
  {
    accessor: 'name',
    title: 'Name',
    render: ({ name }) => {
      return (
        <Box className={styles.tableTitle}>
          <Box className={styles.tableTitleImage}>
            <Image src={name.image} alt="car" width={44} height={36} />
          </Box>
          <Box className={styles.tableTitleText}>
            <Box className={styles.tableTitleTitle}>{name.title}</Box>
            <Box className={styles.tableTitleModal}>{name.account}</Box>
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
    accessor: 'createdDate',
    title: 'Created',
    render: ({ createdDate }) => {
      return (
        <>
          <Box className={styles.createdDate}>
            {dayjs(createdDate).format('DD--MM-YYYY')}
          </Box>
          <Box className={styles.createdTime}>
            {dayjs(createdDate).format('hh:mm A')}
          </Box>
        </>
      )
    },
  },
  {
    accessor: 'city',
    title: 'City',
  },

  {
    accessor: 'isFollow',
    title: '',
    render: ({ isFollow }) => {
      return (
        <Badge
          label={isFollow ? 'Followed' : 'Follow'}
          variant={isFollow ? 'Rejected' : 'Info'}
          underline
          minWidth="78px"
          outlined={isFollow}

        />
      )
    },
  },

  {
    accessor: 'id',
    title: 'Actions',
    textAlign: 'center',
    render: ({ id }) => {
      return (
        <Group justify='center'>
          <ActionIcon
            size={20}
            className={styles.actionButton}
            onClick={() => onClickDelete(id)}
          >
            <IconTrash />
          </ActionIcon>
        </Group>
      )
    },
  },
]

export const followersData = [
  {
    id: "6f9sd34969a0f1",
    name: { title: "Leslie Alexander", image: "/user-profile/follower.png", account: "Personal Account" },
    createdDate: new Date(),
    email: "abc@gmail.com",
    isFollow: true,
    city: "Lahore",
  },
  {
    id: "6fasdf0987",
    name: { title: "Leslie Alexander", image: "/user-profile/follower.png", account: "Personal Account" },
    createdDate: new Date(),
    email: "abc@gmail.com",
    isFollow: false,
    city: "Lahore",
  },
  {
    id: "6fzxcv90fdf69a0f1",
    name: { title: "Leslie Alexander", image: "/user-profile/follower.png", account: "Personal Account" },
    createdDate: new Date(),
    email: "abc@gmail.com",
    isFollow: true,
    city: "Lahore",
  },
]