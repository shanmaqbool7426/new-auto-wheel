'use client';

import { useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { startLoading, stopLoading, selectLoading } from '@/redux/features/loadingSlice';

export const useLoadingState = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  
  // Start loading
  const startLoadingState = useCallback(() => {
    dispatch(startLoading());
  }, [dispatch]);

  // Stop loading
  const stopLoadingState = useCallback(() => {
    dispatch(stopLoading());
  }, [dispatch]);

  // Track navigation events
  useEffect(() => {
    startLoadingState();
    
    const timer = setTimeout(() => {
      stopLoadingState();
    }, 800); // Give more time to show the loading animation

    return () => clearTimeout(timer);
  }, [pathname, startLoadingState, stopLoadingState]);

  return {
    isLoading,
    startLoading: startLoadingState,
    stopLoading: stopLoadingState
  };
};