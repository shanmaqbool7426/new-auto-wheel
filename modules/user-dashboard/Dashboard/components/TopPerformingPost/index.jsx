import React, { useEffect, useState } from 'react';
import { Box } from '@mantine/core';
import styles from './TopPerformingPost.module.css';
import ViewallButton from '../ViewallButton';
import DataTable from '@/components/user-dashboard/DataTable';
import { columns } from './data';
import { useSession } from 'next-auth/react';
import { fetchTopPerformingPosts } from '@/actions';
import Link from 'next/link';
export default function TopPerformingPost() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const fetchPosts = async (pageNumber) => {
    if (session?.user?.token?.token) {
      try {
        setLoading(true);
        const data = await fetchTopPerformingPosts(session?.user?.token?.token,pageNumber);
        setPosts(data.posts);
        setTotalRecords(data.pagination.count);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (session?.user?.token?.token) {
      fetchPosts(page);
    }
  }, [page, session]);

  console.log("posts",posts)
  // Transform API data to match table columns
  const transformedRecords = posts.map(post => ({
    id: post.id,
    post: post.post,
    created: post.created,
    views: post.views,
    clicks: post.clicks,
    slug: post.slug
  }));

  return (
    <Box className={styles.card}>
      <Box className={styles.cardHeader}>
        <Box className={styles.cardTitle}>Top Performing Post</Box>
        <Link href="/user/inventory">
        <ViewallButton />
        </Link>
      </Box>
      <Box>
        <DataTable
          columns={columns}
          records={transformedRecords}
          totalRecords={totalRecords}
          page={page}
          onPageChange={setPage}
          pageSize={6}
          loading={loading}
          loaderSize="sm"
        />
      </Box>
    </Box>
  )
}
