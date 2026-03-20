import React from 'react';

const Loading = ({ message = 'Loading...', size = 'medium' }) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-6 w-6',
    large: 'h-8 w-8',
  };

  const textSizes = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className={`animate-spin rounded-full border-4 border-gray-300 border-t-indigo-600 ${sizeClasses[size]}`}></div>
      <p className={`mt-4 text-gray-600 ${textSizes[size]}`}>{message}</p>
    </div>
  );
};

export const LoadingOverlay = ({ message = 'Processing...' }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full border-4 border-gray-300 border-t-indigo-600 h-6 w-6"></div>
          <p className="text-gray-700 font-medium">{message}</p>
        </div>
      </div>
    </div>
  );
};

export const Skeleton = ({ className = '', height = 'h-4', width = '' }) => {
  return (
    <div className={`animate-pulse bg-gray-300 rounded ${height} ${width} ${className}`}></div>
  );
};

export const SkeletonCard = ({ count = 3 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-4">
          <div className="flex space-x-4">
            <div className="flex-1 space-y-2">
              <Skeleton className="w-3/4" />
              <Skeleton className="w-1/2" />
              <Skeleton className="w-5/6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loading;