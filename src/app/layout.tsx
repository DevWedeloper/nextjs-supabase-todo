import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ToastOptions, Toaster } from 'react-hot-toast';
import './globals.css';

const toastOptions: ToastOptions = {
  duration: 5000,
};

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Toaster position='top-center' toastOptions={toastOptions} />
          {children}
          <div className='fixed bottom-16 right-8 sm:right-16'>
            <ThemeToggle />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
