'use client';

import LoadingOverlay from 'react-loading-overlay';
import { useLoadingState } from "@/utils/useLoadingState";
import styled from 'styled-components';

// Create styled components for customization
const StyledLoader = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const VideoContainer = styled.div`
  background-color: transparent;
  border-radius: 50%;
  padding: 10px;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
`;

const VideoLoader = () => (
  <StyledLoader>
    <VideoContainer>
      <video 
        src="https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745406969847_loader-gif.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          backgroundColor: 'transparent'
        }}
      />
    </VideoContainer>
  </StyledLoader>
);

const StyledOverlay = styled(LoadingOverlay)`
  .MyLoader_overlay {
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(4px);
  }
  .MyLoader_content {
    color: white;
    font-size: 18px;
    font-weight: 600;
    margin-top: 16px;
  }
`;

export default function LoadingWrapper({ children }) {
  const { isLoading } = useLoadingState();

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      <StyledOverlay
        active={isLoading}
        spinner={<VideoLoader />}
       
        classNamePrefix="MyLoader_"
      >
        {children}
      </StyledOverlay>
    </div>
  );
}