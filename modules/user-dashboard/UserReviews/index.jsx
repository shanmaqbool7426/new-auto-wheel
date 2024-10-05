'use client';
import React from 'react';
import Search from '@/components/user-dashboard/Search';
import FilterButton from '@/components/user-dashboard/FilterButton';
import { Box } from '@mantine/core';
import classes from './UserReviews.module.css';
import { postsData } from './data';
import useUserReviews from './useUserReviews';
import PostCard from './PostCard';

export default function UserReviews() {
  const {
    setSearchBy,
    filterParams,
    handleChangeFilter,
    handleClickDeleteRow,
  } = useUserReviews();

  return (
    <>
      <Box className={classes.toolbar}>
        <Box className={classes.searchwrapper}>
          <Box className={classes.search}>
            <Search setSearchBy={setSearchBy} />
          </Box>
        </Box>
        <Box className={classes.actions}>
          <FilterButton />
        </Box>
      </Box>

      <Box>
        {postsData.map((post) => (
          <PostCard
            key={post.id}
            data={post}
          />
        ))}
      </Box>
    </>
  )
}
