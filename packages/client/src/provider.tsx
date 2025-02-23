'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';

interface TapieApiProviderProps {
  children:       React.ReactNode;
  devtools?:      boolean;
  initialIsOpen?: boolean;
}

export function TapieApiProvider(props: TapieApiProviderProps) {
  const { devtools = false, initialIsOpen = false } = props;
  const queryClient = new QueryClient;

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
      {devtools && <ReactQueryDevtools initialIsOpen={initialIsOpen} />}
    </QueryClientProvider>
  );
}
