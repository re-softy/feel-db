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
  });
  
  const [chartSeries, setChartSeries] = useState<any[]>([]);

  useEffect(() => {
    if (media && Array.isArray(media.emotions) && media.emotions.length > 0) {
      const emotionNames = media.emotions.map(emotion => emotion.name);
      const emotionCounts = media.emotions.map(emotion => emotion.count);
      const emojis = media.emotions.map(emotion => emotionToEmoji[emotion.name] || emotion.name);
      
      setChartOptions(prev => ({
        ...prev,
        xaxis: {
          ...prev.xaxis,
          categories: emojis,
        }
      }));
      
      setChartSeries([
        {
          name: '',
          data: emotionCounts,
          emotionNames: emotionNames 
        }
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
  }, [media]);

  return (
    <div
      className={`chart-container flex flex-col ${className} ${border ? 'border border-[#262626] rounded-lg' : ''}`}
      style={{ padding: border ? '1.75rem 1rem' : '', overflow: 'hidden' }}
    >
      <p className="text-xl lg:text-2xl font-medium text-white mb-4">Emotion Statistics</p>
      {chartSeries.length > 0 && chartSeries[0].data.length > 0 ? (
        <div className="overflow-x-auto">
          <div className="min-w-[600px] relative">
            <Chart 
              options={chartOptions} 
              series={chartSeries} 
              type="bar" 
              height={300} 
            />
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