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
    reviews,
    loading,
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
        {loading ? (
          <Box>Loading...</Box>
        ) : reviews?.length > 0 ? (
          reviews.map((review) => (
            <PostCard
              key={review._id}
              data={{
                id: review._id,
                title: `Review #${review._id.slice(-4)}`,
                postedBy: review.user.fullName,
                postedDate: review.createdAt,
                rating: review.rating,
                description: review.content,
                buyingProcess: review.buyingProcess,
                vehicleSelection: review.vehicleSelection,
                servicesLevel: review.levelOfServices,
                reviews: review.comments?.map(comment => ({
                  id: comment._id,
                  replyBy: comment.user?.fullName,
                  reply: comment.content,
                  likes: comment.likes?.length || 0,
                  dislikes: comment.dislikes?.length || 0
                })) || [],
                likes: review.likes?.length || 0,
                dislikes: review.dislikes?.length || 0
              }}
            />
          ))
        ) : (
          <Box sx={{ textAlign: 'center', padding: '2rem' }}>
            No reviews found
          </Box>
        )}
      </Box>
    </>
  );
}