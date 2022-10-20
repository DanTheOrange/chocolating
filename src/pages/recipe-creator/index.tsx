import type { NextPage } from "next"
import Head from "next/head"
import { useRecipes } from "hooks/useRecipes"

const RecipeCreator: NextPage = () => {
  const { recipes } = useRecipes()

  return (
    <>
      <Head>
        <title>Chocolating - Recipe Creator</title>
      </Head>

      <div>
        <h1>Recipe Creator</h1>
        {recipes && (
          <ul>
            {recipes.map(({ name }) => (
              <li>{name}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default RecipeCreator
