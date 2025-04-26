'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';

const Loading = () => {
  // Prevent scrolling when loading
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-white/80 backdrop-blur-sm flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32">
          <Image 
            src="/assets/icons/videos/loading.gif"
            alt="Loading"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>
        <p className="text-red-600 font-semibold text-lg tracking-wide mt-4 animate-pulse">
          Loading<span className="inline-flex">.<span className="animate-bounce delay-100">.</span><span className="animate-bounce delay-200">.</span></span>
        </p>
      </div>
    </div>
  );
};

export default Loading; 