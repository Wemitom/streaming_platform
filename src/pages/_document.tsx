import { Html, Head, Main, NextScript } from 'next/document';
import Image from 'next/image';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-primary sm:overflow-hidden">
        <Image
          src="/images/bgDesk.svg"
          alt="background-vector"
          className="h-full bg-[#10121B]/40 object-cover"
          priority
          fill
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
