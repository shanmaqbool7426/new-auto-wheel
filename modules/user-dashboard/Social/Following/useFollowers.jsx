import React, { useEffect, useState } from 'react';
import { api } from '@/app/(user-dashboard)/services/api';
import { useSession } from 'next-auth/react'; // Assuming you're using NextAuth for session management

export default function useFollowers() {
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


  console.log('session',session)
  useEffect(() => {
    // if (session?.user?._id) {
      fetchFollowers();
    // }
  }, [session, filterParams, searchBy, pagination.page, pagination.limit]);

  const fetchFollowers = async () => {
    setLoading(true);
    try {
      const data = await api.get(`/api/user/66e08a35e874573aeab6d39e/following`, {
        page: pagination.page,
        limit: pagination.limit,
        search: searchBy,
        sort: filterParams.date,
      });


      console.log(data,'>>> data.followers')
      setFollowers(data.data.followings || []);
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
      await api.post(`/users/${userId}/unfollow`);
      fetchFollowers(); // Refresh the list after unfollowing
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
    handleChangeFilter,
    handlePageChange,
    handleUnfollow,
  };
}
