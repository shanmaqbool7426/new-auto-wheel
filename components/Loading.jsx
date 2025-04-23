import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="relative">
          <video 
            src="https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745406969847_loader-gif.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-32 h-32 object-contain"
          />
        </div>
        <p className="text-white font-semibold text-lg tracking-wide mt-4 animate-pulse">
          Loading<span className="inline-flex">.<span className="animate-bounce delay-100">.</span><span className="animate-bounce delay-200">.</span></span>
        </p>
      </div>
    </div>
  );
};

export default Loading; 