import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import QueryClientContextProvider from '@/app/contexts/QueryClientContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'All about fetch',
  description: 'Explore different fetch practices'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <QueryClientContextProvider>{children}</QueryClientContextProvider>
        <Toaster position='bottom-right' />
      </body>
    </html>
  );
}
