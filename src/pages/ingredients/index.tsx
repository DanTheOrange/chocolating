import { createProxySSGHelpers } from "@trpc/react/ssg"
import { FormattedIngredientsList } from "components/FormattedIngredientsList"
import { Layout } from "components/Layout"
import { AddIngredientModal } from "components/pages/ingredients/AddIngredientModal"
import { IngredientListItem } from "components/pages/ingredients/IngredientListItem"
import type { NextPage } from "next"
import Head from "next/head"
import { createContextInner } from "server/trpc/context"
import { appRouter } from "server/trpc/router"
import superjson from "superjson"
import { trpc } from "utils/trpc"

export async function getServerSideProps() {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContextInner({ session: null }),
    transformer: superjson,
  })

  await ssg.ingredients.getAll.prefetch()

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  }
}

const IngredientManager: NextPage = () => {
  const { data } = trpc.ingredients.getAll.useQuery()

  return (
    <>
      <Head>
        <title>Chocolating - Ingredient manager</title>
      </Head>
      <Layout className="flex h-screen flex-col gap-10">
        <header className="mx-10 mt-12">
          <h1 className="text-3xl">Ingredient manager</h1>
        </header>
        <main className="mx-10 flex flex-grow flex-col gap-4">
          <AddIngredientModal />
          {!!data && (
            <FormattedIngredientsList
              ListItem={IngredientListItem}
              ingredients={data}
              className="max-w-2xl"
            />
          )}
        </main>
      </Layout>
    </>
  )
}

export default IngredientManager
