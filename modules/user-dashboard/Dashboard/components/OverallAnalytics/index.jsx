import React from 'react';
import { Box } from '@mantine/core';
import styles from './OverallAnalytics.module.css';
import dynamic from "next/dynamic";
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function OverallAnalytics({ data, viewAnalytics }) {
  console.log("Analytics data:", viewAnalytics);
  
  // Prepare chart data from viewAnalytics
  const chartData = viewAnalytics?.viewsByDate || [];
  
  // Extract categories (dates) for x-axis
  // If the backend provides full dates, we'll extract just the day number
  const categories = chartData.map(item => {
    // Check if we have a date property
    if (item.date) {
      // Extract just the day from the date (e.g., "2023-05-15" -> "15")
      const day = new Date(item.date).getDate();
      return day.toString();
    }
    // Fallback to day property if date is not available
    return item.day;
  });
  
  // Prepare series data
  const series = [
    {
      name: 'No of Views',
      data: chartData.map(item => item['No of Views'])
    },
    {
      name: 'Clicks',
      data: chartData.map(item => item['Clicks'])
    },
    {
      name: 'Views',
      data: chartData.map(item => item['Views'])
    }
  ];
  
  // Chart options
  const options = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: false,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: categories,
      title: {
        text: 'Day'
      }
    },
    yaxis: {
      title: {
        text: 'Views'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " views"
        }
      }
    },
    colors: ['#1C7ED6', '#12B886', '#BE4BDB'],
    legend: {
      position: 'top'
    },
    grid: {
      borderColor: '#f1f1f1',
      strokeDashArray: 4
    }
  };

  return (
    <Box className={styles.card}>
      <Box className={styles.cardHeader}>
        <Box className={styles.cardTitle}>Overall Analytics</Box>
      </Box>

      <Box>
        {chartData.length > 0 ? (
          <Chart
            options={options}
            series={series}
            type="bar"
            height={350}
          />
        ) : (
          <Box style={{ height: 350, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div>No data available</div>
          </Box>
        )}
      </Box>
    </Box>
  )
}
