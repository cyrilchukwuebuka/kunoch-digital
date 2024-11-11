import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="keywords" content="KUNOCH-DIGITAL" />
        <meta name="description" content="KUNOCH-DIGITAL" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          href="/assets/icons/apple-touch-icon.png"
        />
        <link rel="shortcut icon" href="/assets/icons/favicon-32x32.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
