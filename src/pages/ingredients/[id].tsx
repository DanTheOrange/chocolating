import { createProxySSGHelpers } from "@trpc/react/ssg"
import { Layout } from "components/Layout"
import { IngredientForm } from "components/pages/ingredients/IngredientForm"
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
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

  await ssg.ingredients.getById.prefetch({ id })

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  }
}

const Recipe = ({ id }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data } = trpc.ingredients.getById.useQuery({ id })

  return (
    <>
      <Head>
        <title>Chocolating - Edit Ingredient</title>
      </Head>
      <Layout className="flex h-screen flex-col gap-10">
        <header className="mx-10 mt-12">
          <h1 className="text-3xl">Edit Ingredient</h1>{" "}
        </header>
        <main className="mx-10 flex flex-grow flex-col gap-4">
          <div className="max-w-xl rounded-md bg-slate-300 p-8">
            {data && <IngredientForm defaultValues={data} />}
          </div>
          {/* <pre>{JSON.stringify(data, null, 4)}</pre> */}
        </main>
      </Layout>
    </>
  )
}

export default Recipe
