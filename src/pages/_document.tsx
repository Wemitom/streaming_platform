import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
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
          media="(max-width: 767px)"
        />
      </Head>
      <body className="bg-primary md:bg-deskVector bg-phoneVector bg-cover bg-bottom bg-no-repeat sm:overflow-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
