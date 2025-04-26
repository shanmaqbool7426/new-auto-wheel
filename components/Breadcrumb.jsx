import React from 'react';
import Link from 'next/link';
import { Box, Text, Group } from '@mantine/core';
import { HiMiniSlash } from "react-icons/hi2";

/**
 * Reusable breadcrumb component
 * @param {Object} props
 * @param {Array} props.items - Array of breadcrumb items with title and href
 */
const Breadcrumb = ({ items = [] }) => {
  if (!items || items.length === 0) return null;

  return (
    <Box py="md" className="breadcrumb-wrapper">
      <Group spacing={8} align="center">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <React.Fragment key={index}>
              {index > 0 && (
                <Box component="span" className="separator">
                  <HiMiniSlash size={19} color="#6B6B6B" />
                </Box>
              )}
              
              {isLast ? (
                <Text 
                  component="span" 
                  size="sm" 
                  c="#999"
                  fw={400}
                >
                  {item.title}
                </Text>
              ) : (
                <Link 
                  href={item.href} 
                  style={{ 
                    color: '#6B6B6B', 
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: 400
                  }}
                >
                  {item.title}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </Group>
    </Box>
  );
};

export default Breadcrumb; 