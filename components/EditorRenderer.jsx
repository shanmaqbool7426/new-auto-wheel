"use client";
import React from 'react';
import { Box, Image, List, Text, Table, Blockquote, Anchor, Grid } from '@mantine/core';

const EditorRenderer = ({ data }) => {
  if (!data || !data.blocks) return null;


  return (
    <Box>
      {data.blocks.map((block, index) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <Text key={index} mb="md" dangerouslySetInnerHTML={{ __html: block.data.text }} />
            );

          case 'header':
            return (
              <Text 
                key={index} 
                size={block.data.level === 1 ? '2rem' : '1.5rem'} 
                fw={700} 
                mb="md"
              >
                {block.data.text}
              </Text>
            );

          case 'list':
            return (
              <List 
                key={index} 
                type={block.data.style === 'ordered' ? 'ordered' : 'unordered'}
                mb="md"
              >
                {block.data.items.map((item, i) => (
                  <List.Item key={i}>{item.content}</List.Item>
                ))}
              </List>
            );

          case 'checklist':
            return (
              <List key={index} mb="md">
                {block.data.items.map((item, i) => (
                  <List.Item key={i}>
                    <input 
                      type="checkbox" 
                      checked={item.checked} 
                      readOnly 
                      style={{ marginRight: '8px' }} 
                    />
                    {item.text}
                  </List.Item>
                ))}
              </List>
            );

          case 'quote':
            return (
              <Blockquote 
                key={index} 
                cite={block.data.caption} 
                mb="md"
              >
                {block.data.text}
              </Blockquote>
            );

          case 'image':
            return (
              <Box key={index} mb="md">
                <Image
                  src={block.data.file.url}
                  alt={block.data.caption || ''}
                  caption={block.data.caption}
                  radius="md"
                  fit="contain"
                />
                {block.data.caption && (
                  <Text size="sm" c="dimmed" ta="center" mt="xs">
                    {block.data.caption}
                  </Text>
                )}
              </Box>
            );

          case 'link':
            return (
              <Anchor 
                key={index} 
                href={block.data.url} 
                target="_blank" 
                rel="noopener noreferrer"
                mb="md"
              >
                {block.data.text || block.data.url}
              </Anchor>
            );

          case 'table':
            return (
              <Box 
                key={index} 
                mb="xl"
                style={{
                  border: '1px solid #e9ecef',
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}
              >
                {block.data.content.map((row, rowIndex) => (
                  <Grid 
                    key={rowIndex}
                    style={{
                      borderBottom: rowIndex !== block.data.content.length - 1 ? '1px solid #e9ecef' : 'none',
                      margin: 0,
                      backgroundColor: rowIndex % 2 === 0 ? '#f8f9fa' : 'white',
                      position: 'relative',
                    }}
                  >
                    <Grid.Col 
                      span={6}
                      style={{
                        borderRight: '1px solid #e9ecef',
                      }}
                    >
                      <Text 
                        p="md" 
                        fw={600}
                        style={{
                          color: '#1a1b1e',
                          fontSize: '0.95rem',
                        }}
                      >
                        {row[0]}
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text 
                        p="md"
                        style={{
                          fontSize: '0.95rem',
                          color: '#495057',
                        }}
                      >
                        {row[1]}
                      </Text>
                    </Grid.Col>
                  </Grid>
                ))}
              </Box>
            );

          default:
            return null;
        }
      })}
    </Box>
  );
};

export default EditorRenderer;