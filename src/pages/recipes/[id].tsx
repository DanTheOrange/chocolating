import { createProxySSGHelpers } from "@trpc/react/ssg"
import { Layout } from "components/Layout"
import { IngredientSelector } from "components/pages/recipes/IngredientSelector"
import { IngredientsList } from "components/pages/recipes/IngredientsList"
import { RecipeNutritionBlock } from "components/pages/recipes/RecipeNutritionBlock"
import { SaveButton } from "components/pages/recipes/SaveButton"
import { useRecipeStore } from "hooks/useRecipeStore"
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import Head from "next/head"
import { useEffect } from "react"
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

  await ssg.recipes.getById.prefetch({ id })

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  }
}

const Recipe = ({ id }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data, refetch } = trpc.recipes.getById.useQuery(
    { id },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: Infinity, // this is probably not a good idea
    }
  )

  const { recipe, ingredients, saved, updateRecipe } = useRecipeStore()

  // data dependency updates once on page load so zustand has the recipe
  // saved updates from there
  useEffect(() => {
    data && updateRecipe(data)
  }, [data, saved])

  return (
    <>
      <Head>
        <title>Chocolating - Recipe Creator</title>
      </Head>
      <Layout className="flex h-screen flex-col gap-10">
        <header className="mx-10 mt-12">
          <h1 className="text-3xl">Recipe Creator</h1>
        </header>
        <main className="mx-10 flex flex-grow flex-col gap-4">
          <SaveButton refetch={refetch} />
          <IngredientSelector />
          <IngredientsList />
          <RecipeNutritionBlock />
          {/* <pre>{JSON.stringify(data, null, 4)}</pre>
          <pre>{JSON.stringify(recipe, null, 4)}</pre>
          <pre>{JSON.stringify(ingredients, null, 4)}</pre> */}
        </main>
      </Layout>
    </>
  )
}

export default Recipe
