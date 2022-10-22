import type { NextPage } from "next"
import Head from "next/head"
import { RecipesProvider } from "hooks/useRecipes"
import { RecipeList } from "components/pages/recipe-creator/RecipeList"

const RecipeCreator: NextPage = () => (
  <RecipesProvider>
    <Head>
      <title>Chocolating - Recipe Creator</title>
    </Head>

    <div className="m-10 flex flex-col gap-4">
      <h1 className="text-3xl">Recipe Creator</h1>
      <RecipeList />
    </div>
  </RecipesProvider>
)

export default RecipeCreator
