'use client';
import { FC } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

type Props = {
  children?: React.ReactNode;
};

const QueryClientContextProvider: FC<Props> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default QueryClientContextProvider;
