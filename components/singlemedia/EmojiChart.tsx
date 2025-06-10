"use client";

import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { useState, useEffect } from 'react';
import { EmojiChartProps } from '@/types/types';
import { getAllEmotionsAsArray } from '@/utils/emotionUtils';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const emotionToEmoji: { [key: string]: string } = {
  Joy: '😃',
  Sadness: '😭',
  Fear: '😱',
  Anger: '🤬',
  Disgust: '🤢',
  Surprise: '🤯',
  Anticipation: '🧐',
  Happiness: '😊',
  Melancholy: '😢',
  Curiosity: '🤔',
  Love: '🥰',
  Nostalgia: '🥺',
  Humor: '😂',
  Excitement: '🤩',
  Anxiety: '😨',
  Guilt: '😓',
  Hope: '🤞',
  Confusion: '😕',
  Disturbing: '😳',
  Inspiration: '😏',
  Envy: '😐',
  Empathy: '🥲',
  Relief: '😋',
  Satisfaction: '😊',
  Awe: '🤗',
};

function EmojiChart({ border = false, className = '', media }: EmojiChartProps) {
  const [chartOptions, setChartOptions] = useState<ApexOptions>({
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
          fontSize: '26px',
          cssClass: 'items-center justify-center flex',
        },
        rotateAlways: false,
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
      enabled: true,
      shared: false,
      intersect: true,
      custom: ({ series, seriesIndex, dataPointIndex, w }) => {
        const emotionName = w.config.series[0].emotionNames[dataPointIndex];
        const value = series[seriesIndex][dataPointIndex];

        return `
          <div style="padding: 8px; color: white; border-radius: 5px;">
            <span>${emotionName}: ${value} reactions</span>
          </div>
        `;
      },
      x: { show: false },
      y: {
        title: {
          formatter: () => ''
        }
      },
      marker: { show: false },
      onDatasetHover: {
        highlightDataSeries: false,
      },
    },
    responsive: [
      {
        breakpoint: 640,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '70%',
            },
          },
        },
      },
      {
        breakpoint: 1024,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '75%',
            },
          },
        },
      },
    ],
  });

  const [chartSeries, setChartSeries] = useState<any[]>([]);
  const [chartWidth, setChartWidth] = useState<number | string>(600);

  useEffect(() => {
    const updateChartWidth = () => {
      const mediaData = media as any;
      const mediaForEmotions = mediaData?.emotions ? mediaData : mediaData?.movie;
      const emotionsArray = getAllEmotionsAsArray(mediaForEmotions);
      
      if (emotionsArray && emotionsArray.length > 0) {
        if (window.innerWidth >= 1440) {
          setChartWidth('100%');
        } else {
          const calculatedWidth = Math.max(600, 50 * emotionsArray.length);
          setChartWidth(calculatedWidth);
        }
      } else {
        setChartWidth(window.innerWidth >= 1440 ? '100%' : 600);
      }
    };
    updateChartWidth();

    window.addEventListener('resize', updateChartWidth);

    return () => window.removeEventListener('resize', updateChartWidth);
  }, [media]);

  useEffect(() => {
    const mediaData = media as any;
    const mediaForEmotions = mediaData?.emotions ? mediaData : mediaData?.movie;
    const emotionsArray = getAllEmotionsAsArray(mediaForEmotions);

    if (emotionsArray && emotionsArray.length > 0) {
      const filteredEmotions = emotionsArray.filter(emotion => emotion.count > 0);
  
      if (filteredEmotions.length > 0) {
        const emotionNames = filteredEmotions.map(emotion => emotion.name);
        const emotionCounts = filteredEmotions.map(emotion => emotion.count);
        const emojis = filteredEmotions.map(emotion => emotionToEmoji[emotion.name] || emotion.name);

        setChartOptions(prev => ({
          ...prev,
          xaxis: {
            ...prev.xaxis,
            categories: emojis,
          },
        }));

        setChartSeries([
          {
            name: '',
            data: emotionCounts,
            emotionNames: emotionNames,
          },
        ]);
      } else {
        setChartSeries([]);
        setChartOptions(prev => ({
          ...prev,
          xaxis: {
            ...prev.xaxis,
            categories: [],
          },
        }));
      }
    } else {
      setChartSeries([]);
      setChartOptions(prev => ({
        ...prev,
        xaxis: {
          ...prev.xaxis,
          categories: [],
        },
      }));
    }
  }, [media]);

  return (
    <div
      className={`chart-container flex flex-col w-full ${className} ${border ? 'border border-[#262626] rounded-lg' : ''}`}
      style={{ padding: border ? '1.75rem 1rem' : '' }}
    >
      <p className="text-xl lg:text-3xl font-medium text-white mb-4">Emotion Statistics</p>
      {chartSeries.length > 0 && chartSeries[0].data.length > 0 ? (
        <div className="w-full lg:overflow-x-visible overflow-x-auto">
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={400}
            width={chartWidth}
          />
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