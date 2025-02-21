'use client';

import { LoadingOverlay } from "@mantine/core";
import { useLoadingState } from "@/utils/useLoadingState";

export default function LoadingWrapper({ children }) {
  const { isLoading } = useLoadingState();

  return (
    <div style={{ 
      position: 'relative', 
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <LoadingOverlay
        visible={isLoading}
        zIndex={9999}
        overlayProps={{ 
          radius: "sm", 
          blur: 2,
          color: "rgba(255, 255, 255, 0.8)",
          fixed: true
        }}
        loaderProps={{ 
          color: "red", 
          type: "bars",
        }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      />
      {children}
    </div>
  );
}