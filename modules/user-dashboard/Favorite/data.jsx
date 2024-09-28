import dayjs from 'dayjs';
import Image from 'next/image';
import styles from './Favorite.module.css';
import { ActionIcon, Group, Box } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

export const getColumns = (onClickDelete) => [
  {
    accessor: 'post',
    title: 'Post',
    render: ({ post }) => {
      return (
        <Box className={styles.tableTitle}>
          <Box className={styles.tableTitleImage}>
            <Image src={post.image} alt="car" width={42} height={26} />
          </Box>
          <Box className={styles.tableTitleText}>
            <Box className={styles.tableTitleTitle}>{post.title}</Box>
            <Box className={styles.tableTitleModal}>{post.modal}</Box>
          </Box>
        </Box>
      )
    },
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
    accessor: 'type',
    title: 'Type',
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

export const favoriteData = [
  {
    id: "6f9sd34969a0f1",
    post: { title: "Stock ID 24563", image: "/cars/car-sm.png", modal: "2016 Ford Escape" },
    createdDate: new Date(),
    type: "Car",
    price: "1,350,000",
    city: "Lahore.",
  },
  {
    id: "6fasdf0987",
    post: { title: "Stock ID 24563", image: "/cars/car-sm.png", modal: "2016 Ford Escape" },
    createdDate: new Date(),
    type: "Car",
    price: "1,350,000",
    city: "Lahore.",
  },
  {
    id: "6fzxcv90fdf69a0f1",
    post: { title: "Stock ID 24563", image: "/cars/car-sm.png", modal: "2016 Ford Escape" },
    createdDate: new Date(),
    type: "Car",
    price: "1,350,000",
    city: "Lahore.",
  },
  {
    id: "6f9sd3lkjhg9a0f1",
    post: { title: "Stock ID 24563", image: "/cars/car-sm.png", modal: "2016 Ford Escape" },
    createdDate: new Date(),
    type: "Car",
    price: "1,350,000",
    city: "Lahore.",
  },
  {
    id: "6f93098rfdfds9a0f1",
    post: { title: "Stock ID 24563", image: "/cars/car-sm.png", modal: "2016 Ford Escape" },
    createdDate: new Date(),
    type: "Car",
    price: "1,350,000",
    city: "Lahore.",
  },
  {
    id: "hgjgh69a0f1",
    post: { title: "Stock ID 24563", image: "/cars/car-sm.png", modal: "2016 Ford Escape" },
    createdDate: new Date(),
    type: "Car",
    price: "1,350,000",
    city: "Lahore.",
  },
  {
    id: "a24569a0f1",
    post: { title: "Stock ID 24563", image: "/cars/car-sm.png", modal: "2016 Ford Escape" },
    createdDate: new Date(),
    type: "Car",
    price: "1,350,000",
    city: "Lahore.",
  },
  {
    id: "12334349906f1",
    post: { title: "Stock ID 24563", image: "/cars/car-sm.png", modal: "2016 Ford Escape" },
    createdDate: new Date(),
    type: "Car",
    price: "1,350,000",
    city: "Lahore.",
  },
  {
    id: "6f9349asdfq1",
    post: { title: "Stock ID 24563", image: "/cars/car-sm.png", modal: "2016 Ford Escape" },
    createdDate: new Date(),
    type: "Car",
    price: "1,350,000",
    city: "Lahore.",
  },
  {
    id: "6f9sd34969asd0f1",
    post: { title: "Stock ID 24563", image: "/cars/car-sm.png", modal: "2016 Ford Escape" },
    createdDate: new Date(),
    type: "Car",
    price: "1,350,000",
    city: "Lahore.",
  },
  {
    id: "6f9hg9906dfds9a0f1",
    post: { title: "Stock ID 24563", image: "/cars/car-sm.png", modal: "2016 Ford Escape" },
    createdDate: new Date(),
    type: "Car",
    price: "1,350,000",
    city: "Lahore.",
  },
  {
    id: "6f93499f1",
    post: { title: "Stock ID 24563", image: "/cars/car-sm.png", modal: "2016 Ford Escape" },
    createdDate: new Date(),
    type: "Car",
    price: "1,350,000",
    city: "Lahore.",
  },
  {
    id: "6f9sd34969a0f1",
    post: { title: "Stock ID 24563", image: "/cars/car-sm.png", modal: "2016 Ford Escape" },
    createdDate: new Date(),
    type: "Car",
    price: "1,350,000",
    city: "Lahore.",
  },
  {
    id: "6f9",
    post: { title: "Stock ID 24563", image: "/cars/car-sm.png", modal: "2016 Ford Escape" },
    createdDate: new Date(),
    type: "Car",
    price: "1,350,000",
    city: "Lahore.",
  },
  {
    id: "6f90fdf69a0f1",
    post: { title: "Stock ID 24563", image: "/cars/car-sm.png", modal: "2016 Ford Escape" },
    createdDate: new Date(),
    type: "Car",
    price: "1,350,000",
    city: "Lahore.",
  },
]