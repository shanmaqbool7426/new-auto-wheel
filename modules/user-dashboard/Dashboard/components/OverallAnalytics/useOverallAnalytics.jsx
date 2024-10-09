import React from 'react'

export default function useOverallAnalytics() {
  const series = [
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
  ];

  const options = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    // plotOptions: {
    //   bar: {
    //     borderRadius: {
    //       topLeft: 10,
    //       topRight: 10,
    //       bottomRight: 0,
    //       bottomLeft: 0
    //     },
    //     horizontal: false,
    //     columnWidth: '50%',
    //   }
    // },
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
      // itemMargin: {
      //   vertical: 16,
      //   horizontal: 49,
      // },
      markers: {
        size: 6,
        shape: 'circle',
      },
    },
    tooltip: {
      enabled: true,
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
