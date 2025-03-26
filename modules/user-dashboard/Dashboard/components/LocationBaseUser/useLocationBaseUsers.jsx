import React from 'react'

export default function useLocationBaseUsers({ viewAnalytics }) {
  // Extract cities and their counts from viewsByLocation
  const locationData = viewAnalytics?.viewsByLocation || [];
  const cities = locationData.map(location => location._id);
  const counts = locationData.map(location => location.count);

  const series = [
    {
      name: 'Users',
      data: counts
    }
  ];

  const options = {
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
      categories: cities,
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
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
      yaxis: {
        lines: {
          show: true
        }
      }
    }
  };

  return {
    options,
    series
  }
}
