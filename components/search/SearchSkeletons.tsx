import React from 'react';

const MediaCardSkeleton = () => {
  return (
    <div className="relative w-full pb-[138.71%] rounded-md overflow-hidden cursor-pointer">
      <div className="absolute inset-0 bg-grey animate-pulse rounded-md" />
      <div className="absolute bottom-0 w-full bg-[#2d2d2d] rounded-b-md z-10 h-10">
        <div className="mt-2">
          <div className="flex justify-between items-center gap-3">
          </div>
        </div>
      </div>
    </div>
  );
};

const AllContentSkeleton = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] 2xl:grid-cols-4 3xl:grid-cols-5 gap-y-10 gap-x-6 my-10 px-4 place-items-center">
      {[...Array(12)].map((_, index) => (
        <div
          key={index}
          className="w-full transition-transform transform"
        >
          <MediaCardSkeleton />
        </div>
      ))}
    </div>
  );
};

export { MediaCardSkeleton, AllContentSkeleton };