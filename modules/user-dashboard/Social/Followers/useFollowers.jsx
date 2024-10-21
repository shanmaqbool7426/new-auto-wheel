import React, { useEffect, useState } from 'react';
import { api } from '@/app/(user-dashboard)/services/api';
import { useSession } from 'next-auth/react'; // Assuming you're using NextAuth for session management
import { showNotification } from '@mantine/notifications'; // Add this import

export default function useFollowers({userId}) {
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



  console.log('session>>>>>>>>>',userId)
  useEffect(() => {
    // if (session?.user?._id) {
      fetchFollowers(userId);
    // }
  }, [filterParams, searchBy, pagination.page, pagination.limit,userId]);

  const fetchFollowers = async (userId) => {
    console.log('userId>>',userId)
    setLoading(true);
    try {
      const data = await api.get(`/api/user/67139bb54aabf4d48e4dbfff/followers`, {
        page: pagination.page,
        limit: pagination.limit,
        search: searchBy,
        sort: filterParams.date,
      });


      console.log(data,'>>> data.followers')
      setFollowers(data.data.followers || []);
      setPagination({
        ...pagination,
        total: data.total,
        totalPages: data.totalPages,
      });
    } catch (err) {
      setError('Failed to fetch followers');
      console.error(err);
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

  const handleUnfollow = async (userId) => {
    try {
      const response = await api.post(`/api/user/${userId}/unfollow`);
      console.log('Unfollow response:', response); // For debugging
  
      if (response.success) {
        fetchFollowers(); // Refresh the list after unfollowing
        showNotification({
          title: "Success",
          message: response.message || "User unfollowed successfully.",
          color: "green",
        });
      } else {
        // Handle unsuccessful response
        showNotification({
          title: "Error",
          message: response.message || "Failed to unfollow user.",
          color: "red",
        });
      }
    } catch (err) {
      console.error('Unfollow error:', err);
      showNotification({
        title: "Error",
        message: err.response?.data?.message || "An unexpected error occurred. Please try again.",
        color: "red",
      });
    }
  };

  console.log('followersfollowers',followers)

  return {
    followers,
    loading,
    error,
    setSearchBy,
    filterParams,
    pagination,
    handleChangeFilter,
    handlePageChange,
    handleUnfollow,
  };
}
