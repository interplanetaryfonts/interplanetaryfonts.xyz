import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="https://lens.xyz/widget-styles.css" />
          <Script
            id="Lens"
            src="https://lens.xyz/widget.js"
            strategy="beforeInteractive"
          />
        </Head>
        <body>
          <Main />
          <div id="backdrop-root" />
          <div id="overlay-root" />
          <NextScript />
        </body>
      </Html>
    );
  }
}
