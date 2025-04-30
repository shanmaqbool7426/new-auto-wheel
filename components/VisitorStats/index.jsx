import React, { useEffect, useState } from 'react';
import { Box, Text, Group, Paper } from '@mantine/core';
import { IconArrowUpRight, IconArrowDownRight } from '@tabler/icons-react';
import axios from 'axios';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

const VisitorStats = () => {
  const [stats, setStats] = useState({
    todayVisitors: 0,
    percentageChange: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.VISITOR.STATS);
        if (response.data.success) {
          setStats(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching visitor stats:', error);
      }
    };

    fetchStats();
    // Refresh stats every 5 minutes
    const interval = setInterval(fetchStats, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Paper p="md" radius="md" shadow="sm">
      <Box>
        <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
          Visitors
        </Text>
        <Group align="flex-end" gap="xs" mt={4}>
          <Text fw={700} size="xl">{stats.todayVisitors}</Text>
          <Group gap={4} align="center">
            {stats.percentageChange > 0 ? (
              <IconArrowUpRight size={20} style={{ color: '#40C057' }} stroke={1.5} />
            ) : (
              <IconArrowDownRight size={20} style={{ color: '#FA5252' }} stroke={1.5} />
            )}
            <Text size="sm" c={stats.percentageChange > 0 ? 'teal' : 'red'}>
              {Math.abs(stats.percentageChange)}% vs last Day
            </Text>
          </Group>
        </Group>
      </Box>
    </Paper>
  );
};

export default VisitorStats; 