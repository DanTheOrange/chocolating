import { Head, Html, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="description" content="An app to assist in all kinds of chocolating" />

        <link type="image/png" sizes="96x96" rel="icon" href="/favicon.png" />
      </Head>
      <body className="flex min-h-screen flex-col bg-slate-200">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
