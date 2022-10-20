import { Html, Head, Main, NextScript } from "next/document"
import { Footer } from "components/Footer"

export default function Document() {
  return (
    <Html>
      <Head>
        <meta
          name="description"
          content="An app to assist in all kinds of chocolating"
        />

        <link type="image/png" sizes="96x96" rel="icon" href="/favicon.png" />
      </Head>
      <body className="flex min-h-screen flex-col bg-slate-200">
        <div className="flex-grow">
          <Main />
        </div>
        <Footer />
        <NextScript />
      </body>
    </Html>
  )
}
