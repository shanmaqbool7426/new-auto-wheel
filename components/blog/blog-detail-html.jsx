"use client";
import { ActionIcon, Box, Card, Group, Image, List, rem, Text, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { BiLogoInstagramAlt } from 'react-icons/bi';
import { BsTwitterX, BsYoutube } from 'react-icons/bs';
import parse from "html-react-parser";


import { Link } from '@mantine/core';
import EditorRenderer from '../EditorRenderer';

const BlogDetailHtml = ({ content, blog }) => {
  const [tableOfContents, setTableOfContents] = useState([]);

  useEffect(() => {
    // Extract headings from strong tags
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;

    const strongTags = tempDiv.getElementsByTagName('strong');
    const toc = Array.from(strongTags).map((tag, index) => ({
      id: `section-${index}`,
      text: tag.textContent
    }));

    setTableOfContents(toc);
  }, [content]);

  // Function to wrap strong tags with div IDs
  const parseWithIds = (content) => {
    let modifiedContent = content;
    tableOfContents.forEach((item) => {
      modifiedContent = modifiedContent.replace(
        `<strong>${item.text}</strong>`,
        `<div id="${item.id}"><strong>${item.text}</strong></div>`
      );
    });
    return parse(modifiedContent);
  };


  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.scrollBy(0, -100); // Offset for fixed headers
    }
  };

  return (
    <>
      <Card
        mb="lg"
        color="#E90808"
        mt="xl"
        padding="lg"
        shadow="0px 4px 20px 0px #00000014"
      >
        {tableOfContents.length > 0 && (
          <>
            <Title order={3} mb="lg">
              Table of Contents
            </Title>

            <List spacing="xs" size="sm" mb="xl">
              {tableOfContents.map((item, index) => (
                <List.Item
                  key={item.id}
                  onClick={() => scrollToHeading(item.id)}
                  style={{
                    cursor: 'pointer',
                    color: '#E90808'
                  }}
                >
                  {index + 1}. {item.text}
                </List.Item>
              ))}
            </List>
          </>
        )}
        <div className="blog-content">
          <EditorRenderer data={JSON.parse(content)} />

        </div>
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
                {blog?.author}
              </Title>
              <Text size="md">
                I am content writer at AutoWheels Australia. I love
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
  );
};

export default BlogDetailHtml;
