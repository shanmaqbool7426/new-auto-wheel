import React from 'react';
import { Box } from '@mantine/core';

export default function Badge({ onClick, label, variant, outlined, underline, minWidth, ...rest }) {
  const colorMap = {
    'Active': '#4CB64A',
    'Inactive': '#333333',
    'Pending': '#EB2321',
    'Expired': '#C322FC',
    'Rejected': '#EB2321',
    'Info': '#1B84FF',
  };

  const color = colorMap[variant] || colorMap['default'];

  return (
    <Box
      onClick={onClick}
      style={{
        backgroundColor: outlined ? 'transparent' : color,
        color: outlined ? color : '#ffffff',
        border: `1px solid ${color}`,
        padding: '5px 12px',
        textAlign: 'center',
        borderRadius: '20px',
        fontWeight: 400,
        textDecoration: underline ? 'underline' : 'none',
        lineHeight: 1,
        display: 'inline-block',
        minWidth: minWidth ?? '94px',
      }}
      {...rest}
    >
      {label}
    </Box>
  )
}
