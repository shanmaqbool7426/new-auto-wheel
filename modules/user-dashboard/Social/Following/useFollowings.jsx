import React, { useEffect, useState } from 'react';
import { api } from '@/app/(user-dashboard)/services/api';
import { useSession } from 'next-auth/react'; // Assuming you're using NextAuth for session management
import { getLocalStorage } from '@/utils';
import { BASE_URL } from '@/constants/api-endpoints';
import useFollowers from '../Followers/useFollowers';

export default function useFollowings(userId) {
  const token = getLocalStorage('token');
  const {fetchFollowers} = useFollowers({userId})

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
  const { data: session } = useSession();

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

  console.log('session>>>',token)
  useEffect(() => {
    // if (session?.user?._id) {
      fetchFollowings();
    // }
  }, [session, filterParams, searchBy, pagination.page, pagination.limit]);

   const fetchFollowings = async () => {
    setLoading(true);
    try {
      const data = await api.get(`/api/user/${token?._id}/following`, {
        page: pagination.page,
        limit: pagination.limit,
        search: searchBy,
        sort: filterParams.date,
      });


      setFollowers(data.data.followings || []);
      setPagination({
        ...pagination,
        total: data?.data?.total,
        totalPages: data?.data?.totalPages,
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
      await api.post(`/api/user/${userId}/unfollow`);
      fetchFollowings();
      fetchFollowers();
       // Refresh the list after unfollowing
    } catch (err) {
      setError('Failed to unfollow user');
      console.error(err);
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
    fetchFollowings,
    handleChangeFilter,
    handlePageChange,
    handleUnfollow,
  };
}
