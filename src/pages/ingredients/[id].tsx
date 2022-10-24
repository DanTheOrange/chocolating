import { createProxySSGHelpers } from "@trpc/react/ssg"
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import Head from "next/head"
import { createContextInner } from "server/trpc/context"
import { appRouter } from "server/trpc/router"
import superjson from "superjson"
import { trpc } from "utils/trpc"

export async function getServerSideProps(context: GetServerSidePropsContext<{ id: string }>) {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContextInner({ session: null }),
    transformer: superjson,
  })

  const id = context.params?.id as string

  await ssg.ingredients.byId.prefetch({ id })

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  }
}

const Recipe = ({ id }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data } = trpc.ingredients.byId.useQuery({ id })
  console.log(id, data)
  return (
    <>
      <Head>
        <title>Chocolating - Recipe Creator</title>
      </Head>

      <div className="m-10 flex flex-col gap-4">
        <h1 className="text-3xl">Edit Ingredient</h1>
        <pre>{JSON.stringify(data, null, 4)}</pre>
      </div>
    </>
  )
}

export default Recipe
