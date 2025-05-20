"use client";

import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { useState, useEffect } from 'react';
import { EmojiChartProps } from '@/types/types';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const emotionToEmoji: { [key: string]: string } = {
  Joy: '😃',
  Sadness: '😭',
  Fear: '😱',
  Anger: '🤬',
  Disgust: '🤢',
  Surprise: '🤯',
  Anticipation: '🧐',
  Love: '🥰',
  Nostalgia: '🥺',
  Humor: '😂',
  Excitement: '🤩',
  Anxiety: '😨',
  Guilt: '😓',
  Inspiration: '😏',
  Envy: '😐',
  Empathy: '🥲',
  Relief: '😋',
  Satisfaction: '😊',
  Awe: '🤗',
};

function EmojiChart({ border = false, className = '', media }: EmojiChartProps) {
  const [chartData, setChartData] = useState<ApexOptions>({
    series: [
      {
        name: 'Emotion Frequency',
        data: [],
      },
    ],
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
      background: 'none',
    },
    states: {
      hover: {
        filter: {
          type: 'none',
        },
      },

    },
    xaxis: {
      categories: [],
      labels: {
        show: true,
        style: {
          fontSize: '20px',
        },
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
        columnWidth: '70%',
        borderRadius: 8,
        borderRadiusApplication: 'end',
      },
    },
    grid: {
      show: false,
    },
    fill: {
      colors: ['#804c39'],
    },
    dataLabels: {
      enabled: false,
    },
    theme: {
      mode: 'dark',
    },
    tooltip: {
      theme: 'dark',
      x: {
        show: true,
      },
      y: {
        formatter: (val: number) => `${val} reactions`,
      },
    },
  });

  const [emotionData, setEmotionData] = useState<Array<{
    name: string;
    count: number;
  }>>([]);

  useEffect(() => {
    if (media && Array.isArray(media.emotions) && media.emotions.length > 0) {
      const data = media.emotions.map(emotion => ({
        name: emotion.name || 'Unknown',
        count: emotion.count || 0,
      }));

      setEmotionData(data);

      setChartData(prevData => ({
        ...prevData,
        series: [
          {
            name: 'Emotion Frequency',
            data: data.map(emotion => emotion.count),
          },
        ],
        xaxis: {
          ...prevData.xaxis,
          categories: data.map(emotion => emotionToEmoji[emotion.name] || emotion.name),
        },
      }));
    } else {
      setEmotionData([]);
      setChartData(prevData => ({
        ...prevData,
        series: [{ name: 'Emotion Frequency', data: [] }],
        xaxis: { ...prevData.xaxis, categories: [] },
      }));
    }
  }, [media]);

  return (
    <div
      className={`chart-container flex flex-col ${className} ${border ? 'border border-[#262626] rounded-lg' : ''}`}
      style={{ padding: border ? '1.75rem 1rem' : '', overflow: 'hidden' }}
    >
      <p className="text-xl lg:text-2xl font-medium text-white mb-4">Emotion Statistics</p>
      {emotionData.length > 0 ? (
        <div className="overflow-x-auto">
          <div className="min-w-[600px] relative">
            <Chart options={chartData} series={chartData.series} type="bar" height={300} />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-64 text-gray-400">
          No emotion data available
        </div>
      )}
    </div>
  );
}

export default EmojiChart;