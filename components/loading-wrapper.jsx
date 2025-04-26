'use client';

import LoadingOverlay from 'react-loading-overlay';
import { useLoadingState } from "@/utils/useLoadingState";
import styled from 'styled-components';
import Image from 'next/image';
import { useEffect } from 'react';

// Create styled components for customization
const StyledLoader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 50%;
`;

const ImageContainer = styled.div`
  background-color: transparent;
  border-radius: 50%;
  padding: 10px;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  position: relative;
`;

const VideoLoader = () => (
  <StyledLoader>
    <ImageContainer>
      <Image 
        src="/assets/icons/videos/loading.gif"
        alt="Loading"
        fill
        style={{
          objectFit: 'contain',
          backgroundColor: 'transparent'
        }}
      />
    </ImageContainer>
  </StyledLoader>
);

const StyledOverlay = styled(LoadingOverlay)`
  .MyLoader_overlay {
    position: fixed !important;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    z-index: 9999;
    overflow: hidden;
  }
  .MyLoader_content {
    color: #E90808;
    font-size: 18px;
    font-weight: 600;
    margin-top: 16px;
  }
  .MyLoader_spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }
`;

export default function LoadingWrapper({ children }) {
  const { isLoading } = useLoadingState();

  // Apply body styles to prevent background scrolling when loading
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    const originalPosition = window.getComputedStyle(document.body).position;
    
    if (isLoading) { // Use the actual isLoading state
      // Save original styles
      document.body.style.setProperty('overflow', 'hidden', 'important');
      document.body.style.setProperty('position', 'fixed', 'important');
      document.body.style.setProperty('width', '100%', 'important');
      document.body.style.setProperty('height', '100%', 'important');
      document.body.style.setProperty('top', '0', 'important');
      document.body.style.setProperty('left', '0', 'important');
    }
    
    return () => {
      // Restore original styles
      document.body.style.overflow = originalStyle;
      document.body.style.position = originalPosition;
      document.body.style.width = '';
      document.body.style.height = '';
      document.body.style.top = '';
      document.body.style.left = '';
    };
  }, [isLoading]);

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      <StyledOverlay
        active={isLoading} // Use the actual isLoading state
        spinner={<VideoLoader />}
        classNamePrefix="MyLoader_"
      >
        {children}
      </StyledOverlay>
    </div>
  );
}