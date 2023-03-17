import { Html, Head, Main, NextScript } from 'next/document';
import Image from 'next/image';

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <link
          rel="preload"
          href="/images/bgDesk.svg"
          as="image"
          media="(min-width: 768px)"
        />
        <link
          rel="preload"
          href="/images/bgPhone.svg"
          as="image"
          media="(max-width: 768px)"
        />
      </Head>
      <body className="bg-primary md:bg-deskVector bg-phoneVector bg-cover bg-bottom bg-no-repeat sm:overflow-hidden">
        {/* <Image
          src="/images/bgDesk.svg"
          alt="background-vector"
          className="h-full bg-[#10121B]/40 object-cover"
          priority
          fill
        /> */}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
