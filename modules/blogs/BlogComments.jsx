import { TimeAgo } from '@/utils';
import { Avatar, Box, Group, Paper, Text, Title } from '@mantine/core';
import React from 'react'

const BlogComments = ({ comments }) => {
if (!comments.length) {
  return (
    <>
      <Box component="section" mt="xl">
        <Title order={3} mb="xs">
          Comments
        </Title>
        <Text>No comments yet</Text>
      </Box>
    </>
  )
}
  return (
    <>
      <Box component="section" mt="xl">
        <Title order={3} mb="xs">
          Comments
        </Title>
        {
        comments?.map((comment, index) => (
          <Paper withBorder radius="md" p="md" my="md" key={index}>
            <Group>
              <Avatar
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                alt="Jacob Warnhalter"
                radius="xl"
              />
              <div>
                <Text fz="sm">{comment.name}</Text>
                <Text fz="xs" c="dimmed">
                  {TimeAgo(comment.createdAt)}
                </Text>
              </div>
            </Group>
            <Text pl={54} pt="sm" size="sm">
           {comment.content}

            </Text>
          </Paper>
        )
        )
      }
      </Box>
    </>
  )
}

export default BlogComments
