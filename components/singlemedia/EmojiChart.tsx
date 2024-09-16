"use client"
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const EmojiChart = () => {
  const [chartData] = useState<ApexOptions>({
    series: [
      {
        name: 'Emotion Frequency',
        data: [10, 15, 12, 8, 7, 16, 11, 13, 10, 9, 15, 12],
      },
    ],
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
      background: 'none',
    },
    xaxis: {
      categories: [
        '😃', '😭', '😱', '🤯', '🤪', '🥳', '😵', '😍', '🤔', '😏', '😒', '😳',
      ],
      labels: {
        show: true, 
      },
    },
    yaxis: {
      labels: {
        show: false, 
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '38%',
        borderRadius: 8, 
      },
    },
    grid: {
      show: false,
    },
    fill: {
      colors: ['#ff7f50'],
    },
    dataLabels: {
      enabled: false, 
    },
    theme: {
      mode: 'dark',
    },
  });

  return (
    <div className="chart-container">
      <h1 className='text-xl font-medium'>Emotion Statistic</h1>
      <Chart options={chartData} series={chartData.series} type="bar" height={400} width={600} />
    </div>
  );
};

export default EmojiChart;
