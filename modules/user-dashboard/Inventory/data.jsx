import styles from './Inventory.module.css';
import Image from 'next/image';
import dayjs from 'dayjs';
import Badge from '@/components/user-dashboard/Badge';
import { ActionIcon, Group, Box, Text, Tooltip } from '@mantine/core';
import { IconPencil, IconTrash, IconEyeOff, IconAlertCircle } from '@tabler/icons-react';
import { capitalize } from '@/utils';
import Link from 'next/link'

export const getColumns = (onClickEdit, onClickDelete, onClickToggle, onExpandRow, handleToggleFeature, openModalMakeFeature, handleShowRejectionReason) => [
  {
    accessor: 'title',
    title: 'Title',
    render: ({ title, id }) => {  
      return (
        <Box
          className={styles.tableTitle}
          style={{ cursor: 'pointer' }}
        >
          <Box className={styles.tableTitleImage}>
            <Image src={title.image} alt="car" width={50} height={50} />
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
    render: ({ createdDate, id }) => {
      return (
        <>
          <Box className={styles.createdDate} onClick={(e) => {
            e.stopPropagation(); // Prevent row click event
            onExpandRow(id);
          }}>
            {dayjs(createdDate).format('DD-MM-YYYY')}
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
    title: 'Featured',
    render: (vehicles, { isFeatured, _id }) => {
      return (
        <>
          <Badge
            onClick={(e) => {
              e.stopPropagation(); // Prevent row click event
              handleToggleFeature(vehicles?.id);
            }}
            label={vehicles?.isFeatured ? 'Featured' : 'Make it Feature'}
            variant={vehicles?.isFeatured ? 'Rejected' : 'Info'}
            underline
            minWidth="116px"
            outlined={isFeatured}
          />
        </>
      )
    },
  },
  {
    accessor: 'status',
    title: 'Status',
    render: ({ status, id }) => {
      return (
        <Badge 
          label={capitalize(status)} 
          variant={capitalize(status)}
          onClick={(e) => {
            e.stopPropagation();
            onExpandRow(id);
          }} 
        />
      )
    },
  },
  {
    accessor: 'id',
    title: 'Actions',
    render: ({ id, slug, status, rejectionReason }) => {
      return (
        <Group justify='left'
          onClick={(e) => {
            e.stopPropagation();
            onExpandRow(id);
          }}
        >
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

          <Link href={`/detail/${slug}`}>
            <ActionIcon
              size={20}
              className={styles.actionButton}
            >
              <IconEyeOff />
            </ActionIcon>
          </Link>

          {status.toLowerCase() === 'rejected' && rejectionReason && (
            <Tooltip label="View Rejection Reason">
              <ActionIcon
                size={20}
                className={styles.actionButton}
                color="red"
                onClick={(e) => {
                  e.stopPropagation();
                  handleShowRejectionReason(rejectionReason);
                }}
              >
                <IconAlertCircle />
              </ActionIcon>
            </Tooltip>
          )}
        </Group>
      )
    },
  },
];

export const companies = [
  {
    id: "6f9sd34969a0f1",
    title: { title: "Stock ID 24563", image: "/cars/car-sm.png", modal: "2016 Ford Escape" },
    createdDate: new Date(),
    type: "Car",
    price: "1,350,000",
    city: "Lahore.",
    isFeatured: true,
    status: 'Active',
  },
  {
    id: "6f9349906dfds9a0f1",
    title: { title: "Stock ID 24563", image: "/cars/car-sm.png", modal: "2016 Ford Escape" },
    createdDate: new Date(),
    type: "Car",
    price: "1,350,000",
    city: "Lahore.",
    isFeatured: false,
    status: 'Inactive',
  },
  {
    id: "6f934990fdf69a0f1",
    title: { title: "Stock ID 24563", image: "/cars/car-sm.png", modal: "2016 Ford Escape" },
    createdDate: new Date(),
    type: "Car",
    price: "1,350,000",
    city: "Lahore.",
    isFeatured: true,
    status: 'Expired',
  },
]





