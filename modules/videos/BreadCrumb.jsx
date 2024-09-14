import { Box, Text } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import { Breadcrumbs, Anchor } from '@mantine/core';
const BreadCrumb = ({breadcrumb}) => {
    const items = [
        { title: 'Home', href: '/' },
        { title: 'Videos', href: '/videos' },
        ...breadcrumb,
      ].map((item, index, arr) => {
        if (index === arr.length - 1) {
          return (
            <Text key={index} c='#FFF'>
              {item.title}
            </Text>
          );
        }
    
        return (
          <Anchor component={Link} href={item.href} key={index} style={{ color: '#FFFFFFB2' }}>
            {item.title}
          </Anchor>
        );
      });
    return (
        <Box className="background-bread-crumb-overlay" mt='58'>
            <div className="container">
                <div className="col-md-12">
                    <Breadcrumbs styles={{ breadcrumb: { color: '#FFFFFFB2' }, separator: { color: '#FFFFFFB2' } }}>
                    {items}
                    </Breadcrumbs>
                </div>
            </div>
        </Box>
    )
}

export default BreadCrumb
