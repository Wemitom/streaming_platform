import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin', 'cyrillic'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={
        montserrat.className +
        ' relative h-full flex flex-col flex-1 min-h-full'
      }
    >
      <Component {...pageProps} />
    </div>
  );
}
