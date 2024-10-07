import React, { useState } from 'react';
import { Box } from '@mantine/core';
import styles from './OverallAnalytics.module.css';
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function OverallAnalytics() {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "No of Views",
        data: [150, 200, 220, 300, 250, 280, 350, 400, 420, 500, 450, 480, 550, 600, 620, 700],
      },
      {
        name: "Clicks",
        data: [300, 500, 480, 470, 460, 490, 600, 310, 425, 320, 230, 140, 150, 160, 170, 180],
      },
      {
        name: "Views",
        data: [200, 250, 150, 400, 300, 305, 500, 250, 500, 505, 600, 650, 370, 175, 180, 185],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30],
      },
      yaxis: {
      },
      stroke: {
        curve: "smooth",
      },
      legend: {
        show: true,
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
      dataLabels: {
        enabled: false,
      },
    },
  });
  return (
    <Box className={styles.card}>
      <Box className={styles.cardHeader}>
        <Box className={styles.cardTitle}>Overall Analytics</Box>
      </Box>

      <Box>
        <Chart options={chartData.options} series={chartData.series} type="bar" height={350} />
      </Box>
    </Box>
  )
}
