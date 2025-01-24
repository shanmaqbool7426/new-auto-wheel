"use client";
import { ActionIcon, Box, Card, Group, Image, List, rem, Tabs, Text, Title } from '@mantine/core'
import React from 'react'
import { BiLogoInstagramAlt } from 'react-icons/bi'
import { BsTwitterX, BsYoutube } from 'react-icons/bs'
import parse from "html-react-parser";

const BlogDetailHtml = ({ content }) => {
  return (
    <>
      <Card
        mb="lg"
        color="#E90808"
        mt="xl"
        padding="lg"
        shadow="0px 4px 20px 0px #00000014"
      >
        <Title order={3} mb="lg">
          Table of Contents
        </Title>

        {parse(content)}  

      </Card>
      <Card
        mb="lg"
        color="#E90808"
        mt="xl"
        padding="lg"
        shadow="0px 4px 20px 0px #00000014"
      >
        <Box className="post-meta-info" mt="xl">
          <Group>
            <Image
              w={50}
              h={50}
              src="/pak-wheel.png"
              alt="Pak Wheel Logo"
              className="img-fluid"
            />
            <Box>
              <Title order={4} fw={600}>
                Sadia Malik
              </Title>
              <Text size="md">
                I am content writer at AutoWheels Pakistan. I love
                Automobile and Technology.
              </Text>
              <ActionIcon.Group mt="xs">
                <ActionIcon variant="transparent" color="#333">
                  <BiLogoInstagramAlt
                    style={{ width: rem(40), height: rem(40) }}
                  />
                </ActionIcon>
                <ActionIcon variant="transparent" color="#333">
                  <BsTwitterX
                    style={{ width: rem(20), height: rem(20) }}
                  />
                </ActionIcon>
                <ActionIcon variant="transparent" color="#333">
                  <BsYoutube
                    style={{ width: rem(20), height: rem(20) }}
                  />
                </ActionIcon>
              </ActionIcon.Group>
            </Box>
          </Group>
        </Box>
      </Card>
    </>
  )
}

export default BlogDetailHtml
