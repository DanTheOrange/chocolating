// src/pages/_app.tsx
import "../styles/globals.css"
import { SessionProvider } from "next-auth/react"
import type { Session } from "next-auth"
import type { AppType } from "next/app"
import { trpc } from "../utils/trpc"
import Head from "next/head"
import { Toaster } from "react-hot-toast"

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
      <Toaster
        position="bottom-left"
        reverseOrder={true}
        containerStyle={{
          bottom: 60,
        }}
      />
    </SessionProvider>
  )
}

export default trpc.withTRPC(MyApp)
