import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  text?: string;
  className?: string;
}

export default function Spinner({
  size = 'md',
  showText = true,
  text = 'Loading...',
  className = '',
}: SpinnerProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 border-2',
    md: 'w-12 h-12 border-3',
    lg: 'w-16 h-16 border-4',
  };

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div className="inline-block">
        <div 
          className={`${sizeClasses[size]} border-orange border-solid rounded-full border-t-transparent animate-spin`}
        ></div>
      </div>
      {showText && (
        <p className="text-orange font-medium text-base">{text}</p>
      )}
    </div>
  );
} 