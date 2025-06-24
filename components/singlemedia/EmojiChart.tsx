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
        const percentage = w.config.series[0].emotionPercentages[dataPointIndex];

        return `
          <div style="padding: 8px; color: white; border-radius: 5px;">
            <span>${emotionName}: ${value} reactions (${percentage}%)</span>
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
              horizontal: true,
              columnWidth: '70%',
              barHeight: '70%',
            },
          },
          xaxis: {
            labels: {
              show: false
            },
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false
            },
            lines: {
              show: false
            }
          },
          yaxis: {
            labels: {
              show: true,
              style: {
                fontSize: '26px',
                cssClass: 'items-center justify-center flex',
              },
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
  const [chartHeight, setChartHeight] = useState<number>(400);
  const [overflowClass, setOverflowClass] = useState('overflow-x-auto');

  useEffect(() => {
    const updateChartDimensions = () => {
      const mediaData = media as any;
      const mediaForEmotions = mediaData?.emotions ? mediaData : mediaData?.movie;
      const emotionsArray = getAllEmotionsAsArray(mediaForEmotions);

      if (emotionsArray && emotionsArray.length > 0) {
        if (window.innerWidth >= 1440) {
          setChartWidth('100%');
          setChartHeight(400);
          setOverflowClass('overflow-x-hidden');
        } else if (window.innerWidth <= 640) {
          setChartWidth('100%');
          const calculatedHeight = Math.max(400, emotionsArray.length * 40);
          setChartHeight(calculatedHeight);
          setOverflowClass('overflow-x-hidden');
        } else {
          const calculatedWidth = Math.max(600, 50 * emotionsArray.length);
          setChartWidth(calculatedWidth);
          setChartHeight(400);
          setOverflowClass('overflow-x-auto');
        }
      } else {
        setChartWidth(window.innerWidth >= 1440 ? '100%' : 600);
        setChartHeight(400);
        setOverflowClass('overflow-x-hidden');
      }
    };
    updateChartDimensions();

    window.addEventListener('resize', updateChartDimensions);
    return () => window.removeEventListener('resize', updateChartDimensions);
  }, [media]);

  useEffect(() => {
    const mediaData = media as any;
    const mediaForEmotions = mediaData?.emotions ? mediaData : mediaData?.movie;
    const emotionsArray = getAllEmotionsAsArray(mediaForEmotions);

    if (emotionsArray && emotionsArray.length > 0) {
      const filteredEmotions = emotionsArray.filter(emotion => emotion.votes > 0);

      if (filteredEmotions.length > 0) {
        const emotionNames = filteredEmotions.map(emotion => emotion.name);
        const emotionCounts = filteredEmotions.map(emotion => emotion.votes);
        const emojis = filteredEmotions.map(emotion => emotionToEmoji[emotion.name] || emotion.name);
        const emotionPercentages = filteredEmotions.map(emotion => emotion.percentage);

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
            emotionPercentages: emotionPercentages,
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
      className={`chart-container flex flex-col w-full ${className} ${border ? 'border border-[#262626] rounded-lg p-4 lg:p-0' : ''}`}
    >
      <p className="text-xl lg:text-3xl font-medium text-white mb-4">Emotion Statistics</p>
      {chartSeries.length > 0 && chartSeries[0].data.length > 0 ? (
        <div className={`w-full ${overflowClass}`}>
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={chartHeight}
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