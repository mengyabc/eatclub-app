import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import QueryProviders from './providers/QueryProvider';
import Navbar from './_components/navbar';
import { CONTAINER_WIDTH } from '@/lib/style';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'EatClub',
    template: `%s - EatClub`,
  },
  description: 'The Best Restaurants with Deals in Australia - EatClub',
  icons: 'https://eatclub.com.au/favicon.ico',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
        <QueryProviders>
          <Navbar />
          <main className={`${CONTAINER_WIDTH} flex flex-col grow`}>{children}</main>
        </QueryProviders>
      </body>
    </html>
  );
}
