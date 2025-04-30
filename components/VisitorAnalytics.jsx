import React from 'react';
import { useGetVisitorAnalyticsQuery, useGetVisitorStatsQuery } from '@/services/visitorTrackingService';
import { Card, CardContent, Typography, Grid, CircularProgress } from '@mui/material';

const VisitorAnalytics = () => {
  const { data: analytics, isLoading: isLoadingAnalytics } = useGetVisitorAnalyticsQuery();
  const { data: stats, isLoading: isLoadingStats } = useGetVisitorStatsQuery();

  if (isLoadingAnalytics || isLoadingStats) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Visitor Statistics
            </Typography>
            <Typography variant="body1">
              Total Visitors: {stats?.totalVisitors || 0}
            </Typography>
            <Typography variant="body1">
              Unique Visitors: {stats?.uniqueVisitors || 0}
            </Typography>
            <Typography variant="body1">
              Average Time on Site: {stats?.averageTimeOnSite || '0:00'}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recent Visitors
            </Typography>
            {analytics?.recentVisitors?.map((visitor, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <Typography variant="body2">
                  Path: {visitor.path}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Time: {new Date(visitor.timestamp).toLocaleString()}
                </Typography>
              </div>
            ))}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default VisitorAnalytics; 