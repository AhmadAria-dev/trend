import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="fa" dir="rtl">
      <Head>
        <link
          rel="preload"
          href="/fonts/IranNastaliq"
          as="font"
          crossOrigin="anonymous"
        />
        <meta
          name="description"
          content="Watch latest movies and music videos"
        />
      </Head>
      <body>
        <Main></Main>
        <NextScript></NextScript>
      </body>
    </Html>
  );
}
