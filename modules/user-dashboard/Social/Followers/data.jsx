import dayjs from 'dayjs';
import Image from 'next/image';
import styles from './Followers.module.css';
import { ActionIcon, Group, Box } from '@mantine/core';
import { IconTrash, IconUserMinus, IconUserPlus } from '@tabler/icons-react';
import Badge from '@/components/user-dashboard/Badge';
import { useEffect, useState } from 'react';

export const getColumns = (toggleFollow) => {
  // Use useState inside the component that uses this function
  const [currentUser, setCurrentUser] = useState(null);
  
  useEffect(() => {
    // Safely get user from localStorage on client side
    if (typeof window !== 'undefined') {
      try {
        const userData = localStorage.getItem('user');
        if (userData) {
          setCurrentUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
      }
    }
  }, []);

  return [
    {
      accessor: 'fullName',
      title: 'Name',
      render: (record) => {
        return (
          <Box className={styles.tableTitle}>
            <Box className={styles.tableTitleImage}>
              {/* Profile image would go here */}
              {record.profileImage ? (
                <Image src={record.profileImage} alt="user" width={44} height={36} />
              ) : (
                <div className={styles.placeholderImage}>{record.fullName?.charAt(0) || 'U'}</div>
              )}
            </Box>
            <Box className={styles.tableTitleText}>
              <Box className={styles.tableTitleTitle}>{record.fullName || 'Unknown User'}</Box>
              <Box className={styles.tableTitleModal}>
                {record.accountType === 'Dealer' ? 'Dealer Account' : 'User Account'}
              </Box>
            </Box>
          </Box>
        );
      },
    },
    {
      accessor: 'email',
      title: 'Email',
      render: (record) => <span>{record.email || 'N/A'}</span>,
    },
    {
      accessor: 'createdAt',
      title: 'Created',
      render: ({ createdAt }) => {
        return createdAt ? (
          <>
            <Box className={styles.createdDate}>
              {dayjs(createdAt).format('DD-MM-YYYY')}
            </Box>
            <Box className={styles.createdTime}>
              {dayjs(createdAt).format('hh:mm A')}
            </Box>
          </>
        ) : (
          <span>N/A</span>
        );
      },
    },
    {
      accessor: 'locationAddress',
      title: 'Location',
      render: (record) => <span>{record.locationAddress || record.city || 'N/A'}</span>,
    },
    {
      accessor: 'isFollow',
      title: 'Status',
      render: (record) => {
        // Check if the current user is following this user
        const isFollowing =record.followers.includes(currentUser?._id) ;
        console.log("currentUser?.following",isFollowing)
        return (
          <Badge
            label={isFollowing ? 'Following' : 'Follow'}
            variant={isFollowing ? 'Success' : 'Info'}
            underline
            minWidth="78px"
            // outlined={!isFollowing}
            onClick={() => toggleFollow(record._id, isFollowing)}
          />
        );
      },
    },
    {
      accessor: '_id',
      title: 'Actions',
      textAlign: 'center',
      render: (record) => {
        console.log("record.followers",)
        // Check if the current user is following this user
        const isFollowing =record.followers.includes(currentUser?._id) ;
        console.log("isFollowing",isFollowing)
        
        return (
          <Group justify='center'>
            <ActionIcon
              size={20}
              className={styles.actionButton}
              onClick={() => toggleFollow(record._id, isFollowing)}
              title={isFollowing ? 'Unfollow' : 'Follow'}
            >
              {isFollowing ? <IconUserMinus /> : <IconUserPlus />}
            </ActionIcon>
          </Group>
        );
      },
    },
  ];
};
