import React from 'react';
import dayjs from 'dayjs';
import { Box, Group, Rating } from '@mantine/core';
import styles from './UserReviews.module.css';
import ViewallButton from '../ViewallButton';
import useUserReviews from './useUserReviews';
import Link from 'next/link';

export default function UserReviews() {
  const {reviews} = useUserReviews();
  return (
    <Box className={styles.card}>
      <Box className={styles.cardHeader}>
        <Box className={styles.cardTitle}>User Reviews</Box>
        <Link href="/user/reviews">
        <ViewallButton />
        </Link>
      </Box>
      <Box className={styles.cardContent}>
        <ul className={styles.reviewsList}>
          {reviews?.map((review) => (
            <li className={styles.reviewListItem}>
              <Box className={styles.review}>
                <Box className={styles.reviewHeader}>
                  <Box className={styles.reviewTitle}>{review.title}</Box>
                  <Box className={styles.reviewRating}>
                    <Group>
                      <Rating size={'xs'} defaultValue={3} readOnly />
                      <Box className={styles.postRatingText}>({review.rating}/5)</Box>
                    </Group>
                  </Box>
                </Box>
                <Box className={styles.reviewMeta}>
                  <Box className={styles.reviewModal}>{review.modal}</Box>
                  <Box className={styles.reviewAuthor}>Posted by {review?.user?.fullName} on {dayjs(review?.createdAt).format('MMM D, YYYY')}</Box>
                </Box>
                <Box className={styles.reviewContent}>
                  {review.content} 
                  {/* <Box className={styles.redText} component='span'>read more</Box> */}
                </Box>
              </Box>
            </li>
          ))}

        </ul>
      </Box>
    </Box>
  )
}
