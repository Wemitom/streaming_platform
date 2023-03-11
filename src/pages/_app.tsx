import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Montserrat } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';

const montserrat = Montserrat({ subsets: ['latin', 'cyrillic'] });

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <div
        className={
          montserrat.className +
          ' relative h-full flex flex-col flex-1 min-h-full'
        }
      >
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
