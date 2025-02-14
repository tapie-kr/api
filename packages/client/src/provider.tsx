import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

interface TapieApiProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export default function TapieApiProvider(props: TapieApiProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
}
