import Document, { Head, Main, Html, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return <Html lang="es">
      <Head>
        {/* link tag with any fonts, and etc. */}
      </Head>
      <body>
        <Main></Main> {/* needed for next.js => adds div with id of _next */}
        <NextScript />  {/* needed for next.js to run scripts in the html*/}
      </body>
    </Html>
  }
}

export default MyDocument;