import { ChocolateBar } from "components/pages/recipes/ChocolateBar"
import type { NextPage } from "next"
import Head from "next/head"

const RecipeCreator: NextPage = () => (
  <>
    <Head>
      <title>Chocolating - Recipe Creator</title>
    </Head>

    <div className="m-10 flex flex-col gap-4">
      <h1 className="text-3xl">Recipe Creator</h1>
      {/* <RecipeList /> */}
      <ChocolateBar />
    </div>
  </>
)

export default RecipeCreator
