"use client";
import { Card, Text, Title } from '@mantine/core'
import React from 'react'

const YoutubePlayer = ({video}) => {
  return (
    <Card padding={0} className="video-thumbnail">
    <Card.Section className="position-relative">
      <iframe
        width="100%"
        height="400"
        src={video?.url}
        title={video?.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </Card.Section>
    <Title order={3} mt="xs" fw={600} className="title">
      {video?.title}
    </Title>
    <Text mt="xs">
      {video?.description}
    </Text>
  </Card>
  )
}

export default YoutubePlayer