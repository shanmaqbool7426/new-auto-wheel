import React from 'react'
import { Image, Title } from '@mantine/core';
import { PlayButton } from "@/components/Icons";
import Link from 'next/link';


const VideoCard = ({video}) => {
  return (
    <Link href={`/videos/${video?.categorySlug}/${video?.slug}`} className='link'>    
    <div className="video-card">
      <div className="video-thumbnail position-relative">
      <span className="play-button position-absolute">
        <PlayButton />
      </span>
        <Image
          src={video?.thumbnail}
          radius={'8px 8px 0 0'}
          h={255}
          className="img-fluid"
          alt="video-thumbnail"
        />
      </div>
      <div className="content-section">
      <Title
        order={3}
        lineClamp={1}
        truncate
        mt="xs"
        fw={600}
        className="title"
      >
        {video?.title}
      </Title>
      </div>
    </div>
    </Link>
  )
}

export default VideoCard
