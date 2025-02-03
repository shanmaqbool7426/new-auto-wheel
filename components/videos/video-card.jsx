import React from 'react'
import { Image, Title, Text } from '@mantine/core';
import { PlayButton } from "@/components/Icons";
import { IconPlayVideo } from "@/assets/icons";
import Link from 'next/link';
import styles from './video-card.module.css';


const VideoCard = ({ video }) => {
  return (
    <Link href={`/videos/${video?.categorySlug}/${video?.slug}`}>
      <div className={styles.videoCard}>
        <div className={styles.videoCardThumb}>
          <Image
            src={video?.thumbnail}
            radius={'8px 8px 0 0'}
            h={255}
            className="img-fluid"
            alt="video-thumbnail"
          />
          <div className={styles.videoCardThumbOverlay}>
            <IconPlayVideo />
          </div>
        </div>
        <div className={styles.videoCardCaption}>
          <Text
            truncate="end"
            className={styles.videoCardCaptionText}
          >
            {video?.title}
          </Text>
        </div>
      </div>
    </Link>
  )
}

export default VideoCard
