import Document, { Head, Main, Html, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return <Html lang="es">
      <Head>
        {/* link tag with any fonts, and etc. */}
      </Head>
      <body>
        <Main></Main>
        <NextScript />  {/* needed for next.js */}
      </body>
    </Html>
  }
}

export default MyDocument;