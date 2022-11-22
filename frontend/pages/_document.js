import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="https://lens.xyz/widget-styles.css" />
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
