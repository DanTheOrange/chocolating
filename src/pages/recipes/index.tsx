import { createProxySSGHelpers } from "@trpc/react/ssg"
import { PrimaryButton } from "components/Button"
import { Layout } from "components/Layout"
import { ChocolateBar } from "components/pages/recipes/ChocolateBar"
import { RecipeList } from "components/pages/recipes/RecipeList"
import type { NextPage } from "next"
import Head from "next/head"
import { useCallback } from "react"
import toast from "react-hot-toast"
import { ImSpinner2 } from "react-icons/im"
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

  await ssg.recipes.getAll.prefetch()

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  }
}

const RecipeCreator: NextPage = () => {
  const utils = trpc.useContext()

  const { data } = trpc.recipes.getAll.useQuery()

  const create = trpc.recipes.createRecipe.useMutation({
    onSuccess: async () => {
      toast.success("Created successfully!")
      await utils.recipes.invalidate()
    },
    onError: () => toast.error("Create failed!"),
  })

  return (
    <>
      <Head>
        <title>Chocolating - Recipe Creator</title>
      </Head>
      <Layout className="flex h-screen flex-col gap-10">
        <header className="mx-10 mt-12">
          <h1 className="text-3xl">Recipe Creator</h1>{" "}
        </header>
        <main className="mx-10 flex flex-grow flex-col gap-4">
          <PrimaryButton
            onClick={() => create.mutate({ name: "New Recipe" })}
            className="flex justify-center sm:w-auto md:w-32"
            disabled={create.isLoading}
          >
            {create.isLoading ? (
              <ImSpinner2 className="animate-spin text-2xl text-inherit" />
            ) : (
              "New Recipe"
            )}
          </PrimaryButton>

          {data && <RecipeList recipes={data} />}
          {/* <ChocolateBar /> */}
        </main>
      </Layout>
    </>
  )
}

export default RecipeCreator
