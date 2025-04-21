import React, { useEffect, useState } from 'react';
import { api } from '@/app/(user-dashboard)/services/api';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX, IconUserPlus, IconUserMinus } from '@tabler/icons-react';
import { getLocalStorage } from '@/utils';
export default function useFollowers({userId}) {
  const token = getLocalStorage('token');
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchBy, setSearchBy] = useState('');
  const [filterParams, setFilterParams] = useState({
    date: 'newToOld',
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  // Reset states when component unmounts or userId changes
  useEffect(() => {
    return () => {
      setFollowers([]);
      setLoading(false);
      setError(null);
      setSearchBy('');
      setFilterParams({ date: 'newToOld' });
      setPagination({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
      });
    };
  }, [userId]);

  useEffect(() => {
    if (userId || token?._id) {
      fetchFollowers();
    }
  }, [filterParams, searchBy, pagination.page, pagination.limit, userId]);

  // Get the actual token string for authorization
  const getAuthToken = () => {
    // Navigate through the token object structure to get the actual token string
    return token?.token?.token || token?.token || token;
  };

  const fetchFollowers = async () => {
    setLoading(true);
    try {
      const userIdToUse = userId || token?._id;
      const authToken = getAuthToken();
      
      // Add authorization header
      const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
      const data = await api.get(`/api/user/${userIdToUse}/followers`, {
        page: pagination.page,
        limit: pagination.limit,
        search: searchBy,
        sort: filterParams.date,
      }, headers);

      
      if (data.data) {
        setFollowers(data.data.followers || []);
        setPagination({
          ...pagination,
          total: data.data.total || 0,
          page: data.data.page || 0,

          totalPages: data.data.totalPages || 1,
        });
      }
    } catch (err) {
      setError('Failed to fetch followers');
      console.error('Error fetching followers:', err);
      
      notifications.show({
        title: 'Error',
        message: 'Failed to load followers',
        color: 'red',
        icon: <IconX size={18} />,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChangeFilter = (name, value) => {
    setFilterParams(prev => ({ ...prev, [name]: value }));
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const handleFollow = async (targetUserId) => {
    try {
      const authToken = getAuthToken();
      // Add authorization header
      const headers = authToken ? { Authorization: `${authToken}` } : {};
      const response = await api.post(`/api/user/${targetUserId}/follow`, {}, headers);
      
      if (response.success) {
        // Update the local state to reflect the follow action
        setFollowers(prev => 
          prev.map(follower => 
            follower._id === targetUserId 
              ? { ...follower, isFollow: true } 
              : follower
          )
        );
        notifications.show({
          title: 'Success',
          message: 'User followed successfully',
          color: 'green',
          icon: <IconCheck size={18} />,
        });
      } else {
        throw new Error(response.message || 'Failed to follow user');
      }
    } catch (err) {
      console.error('Follow error:', err);
      
      notifications.show({
        title: 'Error',
        message: err.message || 'Failed to follow user',
        color: 'red',
        icon: <IconX size={18} />,
      });
    }
  };

  const handleUnfollow = async (targetUserId) => {
    try {
      const authToken = getAuthToken();
      
      // Add authorization header
      const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
      
      const response = await api.post(`/api/user/${targetUserId}/unfollow`, {}, headers);
      
      if (response.success) {
        // Update the local state to reflect the unfollow action
        setFollowers(prev => 
          prev.map(follower => 
            follower._id === targetUserId 
              ? { ...follower, isFollow: false } 
              : follower
          )
        );
        
        
        notifications.show({
          title: 'Success',
          message: 'User unfollowed successfully',
          color: 'green',
          icon: <IconCheck size={18} />,
        });
      } else {
        throw new Error(response.message || 'Failed to unfollow user');
      }
    } catch (err) {
      console.error('Unfollow error:', err);
      
      notifications.show({
        title: 'Error',
        message: err.message || 'Failed to unfollow user',
        color: 'red',
        icon: <IconX size={18} />,
      });
    }
  };

  const toggleFollow = async (targetUserId, currentlyFollowing) => {
    if (currentlyFollowing) {
      await handleUnfollow(targetUserId);
    } else {
      await handleFollow(targetUserId);
    }
    
    // Refresh the followers list after toggling follow status
    fetchFollowers();
  };

  return {
    followers,
    loading,
    error,
    setSearchBy,
    fetchFollowers,
    filterParams,
    pagination,
    handleChangeFilter,
    handlePageChange,
    handleFollow,
    handleUnfollow,
    toggleFollow,
  };
}
