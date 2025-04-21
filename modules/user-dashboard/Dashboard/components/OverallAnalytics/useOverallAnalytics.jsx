import React from 'react'

export default function useOverallAnalytics({ data }) {
  // Create series from API data
  const series = [
    {
      name: "Page Views",
      data: data?.pageViews ? Array(16).fill(data.pageViews) : Array(16).fill(0),
    },
    {
      name: "Clicks",
      data: data?.clicks ? Array(16).fill(data.clicks) : Array(16).fill(0),
    },
    {
      name: "Views",
      data: data?.noViews ? Array(16).fill(data.noViews) : Array(16).fill(0),
    },
  ];

  const options = {
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
    colors: ["#1B84FF", "#01A49E", "#DF1BFF"],
    stroke: {
      curve: "smooth",
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      verticalAlign: 'top',
      markers: {
        size: 6,
        shape: 'circle',
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function (value) {
          return value.toLocaleString();
        }
      }
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      strokeDashArray: 2,
      borderColor: '#cccccc',
      strokeWidth: 2,
      yaxis: {
        lines: {
          show: true
        }
      }
    }
  };

  return {
    series,
    options,
  }
}