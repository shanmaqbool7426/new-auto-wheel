import React, { useState } from 'react';
import { Box } from '@mantine/core';
import styles from './LocationBaseUser.module.css';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function LocationBaseUser() {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'Users',
        data: [1200, 2500, 2100, 3250, 2500, 12500, 2000, 500, 1800, 2800]
      }
    ],
    options: {
      chart: {
        type: 'bar',
        height: 280,
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '6px',
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: false,
      },
      xaxis: {
        categories: ['Sydney', 'Adelaide', 'Brisbane', 'Canberra', 'Melbourne', 'Hobart', 'carnarvon', 'Darwin', 'Perth', 'Hobart'],
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        lines: {
          show: true
        }
      },
      yaxis: {

      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return `${val} users`;
          }
        }
      },
      grid: {
        strokeDashArray: 4,
        borderColor: 'rgba(247, 93, 52, 0.46)',
        strokeWidth: 6,
        xaxis: {
          lines: {
            show: false
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        }
      }

    }
  });

  return (
    <Box className={styles.card}>
      <Box className={styles.cardHeader}>
        <Box className={styles.cardTitle}>Location Base User</Box>
      </Box>

      <Box>
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
        />
      </Box>
    </Box>
  )
}
