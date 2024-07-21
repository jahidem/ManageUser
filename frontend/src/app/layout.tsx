import type { Metadata } from 'next';
import './globals.css';
import GlobalProvider from './_home/authUserContext';

export const metadata: Metadata = {
  title: 'User management',
  description: 'Manage users- acivate, block, delete',
  icons: {
    icon: '/images/doc.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className='h-full bg-white'>
      <body className='h-full'>
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
