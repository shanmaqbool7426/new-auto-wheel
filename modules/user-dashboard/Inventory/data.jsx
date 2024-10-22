import styles from './Inventory.module.css';
import Image from 'next/image';
import dayjs from 'dayjs';
import Badge from '@/components/user-dashboard/Badge';
import { ActionIcon, Group, Box } from '@mantine/core';
import { IconPencil, IconTrash, IconEyeOff } from '@tabler/icons-react';



export const getColumns = (handleMakeFeature, onClickEdit, onClickDelete, onClickToggle) => [
  {
    accessor: 'title',
    title: 'Title',
    render: ({ title }) => {
      return (
        <Box className={styles.tableTitle}>
          <Box className={styles.tableTitleImage}>
            <Image src={title.image} alt="car" width={42} height={26} />
          </Box>
          <Box className={styles.tableTitleText}>
            <Box className={styles.tableTitleTitle}>{title.title}</Box>
            <Box className={styles.tableTitleModal}>{title.modal}</Box>
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
          onClick={(e) => {
            e.stopPropagation();
            handleMakeFeature()
          }}

        />
      )
    },
  },
  {
    accessor: 'status',
    title: 'Status',
    render: ({ status }) => {
      return (
        <Badge label={status} variant={status} />
      )
    },
  },
  {
    accessor: 'id',
    title: 'Actions',
    render: ({ id }) => {
      return (
        <Group justify='left'>
          <ActionIcon
            size={20}
            className={styles.actionButton}
            onClick={(e) => onClickEdit(e, id)}
          >
            <IconPencil />
          </ActionIcon>

          <ActionIcon
            size={20}
            className={styles.actionButton}
            onClick={(e) => onClickDelete(e, id)}
          >
            <IconTrash />
          </ActionIcon>

          <ActionIcon
            size={20}
            className={styles.actionButton}
            onClick={(e) => onClickToggle(e, id)}
          >
            <IconEyeOff />
          </ActionIcon>
        </Group>
      )
    },
  },
]

export const companies = [
  {
    id: "111",
    title: { title: "Stock ID 24563", image: "/cars/car-sm.png", modal: "2016 Ford Escape" },
    createdDate: new Date(),
    type: "Car",
    price: "1,350,000",
    city: "Lahore.",
    isFeatured: true,
    status: 'Active',
  },
  {
    id: "112",
    title: { title: "Stock ID 24563", image: "/cars/car-sm.png", modal: "2016 Ford Escape" },
    createdDate: new Date(),
    type: "Car",
    price: "1,350,000",
    city: "Lahore.",
    isFeatured: false,
    status: 'Inactive',
  },
  {
    id: "113",
    title: { title: "Stock ID 24563", image: "/cars/car-sm.png", modal: "2016 Ford Escape" },
    createdDate: new Date(),
    type: "Car",
    price: "1,350,000",
    city: "Lahore.",
    isFeatured: true,
    status: 'Expired',
  },
]