import React from 'react';
import styles from './PostCard.module.css';
import { Box, Rating, Group, Button } from '@mantine/core';
import dayjs from 'dayjs';
import { IconThumbUp, IconThumbDown } from '@tabler/icons-react';

export default function PostCard({ data }) {
  return (
    <Box className={styles.card}>
      {/* Post */}
      <Box className={styles.post}>
        <Box className={styles.postHeader}>
          <h3 className={styles.postTitle}>{data?.title}</h3>
        </Box>
        <Box className={styles.postMeta}>
          {`Posted by ${data?.postedBy} on ${dayjs(data?.postedDate).format('MMM D, YYYY')}`}
        </Box>
        <Box className={styles.postRating}>
          <Group>
            <Rating size={'xs'} defaultValue={data?.rating} readOnly />
            <Box className={styles.postRatingText}>({data?.rating}/5)</Box>
          </Group>
        </Box>
        <Box className={styles.postDescription}>{data?.description}</Box>
        <Box className={styles.postRatings}>
          <Group gap={'xs'} grow>
            <Box className={styles.ratingGroup}>
              <Box className={styles.ratingGroupLabel}>Buying Process</Box>
              <Group>
                <Rating size={'xs'} defaultValue={data?.buyingProcess} readOnly />
                <Box className={styles.postRatingText}>({data?.buyingProcess}/5)</Box>
              </Group>
            </Box>

            <Box className={styles.ratingGroup}>
              <Box className={styles.ratingGroupLabel}>Vehicle Selection</Box>
              <Group>
                <Rating size={'xs'} defaultValue={data?.vehicleSelection} readOnly />
                <Box className={styles.postRatingText}>({data?.vehicleSelection}/5)</Box>
              </Group>
            </Box>

            <Box className={styles.ratingGroup}>
              <Box className={styles.ratingGroupLabel}>Level of Services</Box>
              <Group>
                <Rating size={'xs'} defaultValue={data?.servicesLevel} readOnly />
                <Box className={styles.postRatingText}>({data?.servicesLevel}/5)</Box>
              </Group>
            </Box>
          </Group>
        </Box>
        <Box className={styles.postFooter}>
          <Box className={styles.reply}>
            <Button
              className={styles.replyButton}
              variant="filled"
              fullWidth
            >
              Reply
            </Button>
          </Box>
          <Group className={styles.postFooterLikes}>
            <Group><IconThumbUp /><Box>10</Box></Group>
            <Group><IconThumbDown /><Box>10</Box></Group>
          </Group>
        </Box>
      </Box>

      {/* Reviews */}
      <Box className={styles.reviews}>
        {data?.reviews && data?.reviews.map(review => (
          <Box key={review?.id} className={styles.review}>
            <h4 className={styles.reviewTitle}>Reply by {review?.replyBy}</h4>
            <Box className={styles.reviewDesc}>{review?.reply}</Box>
            <Box className={styles.reviewMeta}>
              <Group className={styles.postFooterLikes}>
                <Group><IconThumbUp /><Box>10</Box></Group>
                <Group><IconThumbDown /><Box>10</Box></Group>
              </Group>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
