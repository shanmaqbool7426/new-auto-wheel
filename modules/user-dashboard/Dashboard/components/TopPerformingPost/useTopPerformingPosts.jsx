import { API_ENDPOINTS } from '@/constants/api-endpoints';
import { getLocalStorage } from "@/utils";
import React from "react";
import { useSession } from 'next-auth/react';
export default function useTopPerformingPosts() {
    const { data: session } = useSession();
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalRecords, setTotalRecords] = React.useState(0);
  const PAGE_SIZE=6;
  const fetchPosts = async (page = 1, limit = PAGE_SIZE) => {
    if (!session?.user?._id || !session?.user?.token?.token) return;
    try {
      setLoading(true);
      const response = await fetch(
        `${API_ENDPOINTS.VEHICLE.TOP_PERFORMING_POSTS}?page=${page}&limit=${limit}`,
        {
          headers: {
            'Authorization': `Bearer ${session.user.token.token}`
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      
      const data = await response.json();
      setPosts(data?.data?.posts || []);
      setTotalRecords(data?.data?.pagination?.count);
    } catch (error) {
      console.error('Error fetching top performing posts:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
        if (session?.user?.token?.token) {
      fetchPosts(currentPage);
    }
  }, [session,currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const transformedRecords = posts.map(post => ({
    id: post.id,
    post: post.post,
    created: post.created,
    views: post.views,
    clicks: post.clicks,
    slug: post.slug
  }));

  return {
    posts:transformedRecords,
    loading,
    currentPage,
    totalRecords,
    pageSize:PAGE_SIZE,
    handlePageChange
  };
}