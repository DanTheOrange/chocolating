import { PrimaryButton } from "components/Button"
import {
  FormattedIngredientsList,
  TFormattedIngredientsListProps,
} from "components/FormattedIngredientsList"
import { IngredientsProvider, TIngredient, useIngredients } from "hooks/useIngredients"
import { RecipesProvider, useRecipes } from "hooks/useRecipeStore"
import Head from "next/head"
import { useRouter } from "next/router"
import { useCallback, useMemo } from "react"

const Recipe = () => {
  const router = useRouter()
  const { id } = router.query

  if (!id) return

  return (
    <>
      <Head>
        <title>Chocolating - Recipe Creator</title>
      </Head>

      <RecipesProvider>
        <IngredientsProvider>
          {/* I can't find out how id could be an array... */}
          <RecipeCreator id={typeof id === "string" ? id : id[0]!} />
        </IngredientsProvider>
      </RecipesProvider>
    </>
  )
}

export default Recipe

const RecipeCreator = ({ id }: { id: string }) => {
  const { recipes, addRecipe } = useRecipes()
  const { ingredients } = useIngredients()

  const recipe = useMemo(() => {
    return recipes.find(({ uuid }) => uuid === id)
  }, [recipes])

  const filteredIngredients = useMemo(() => {
    const recipeIngredients =
      recipe?.ingredients.map(({ uuid: recipeIngredientId }) => recipeIngredientId) || []
    return ingredients.filter(({ uuid }) => recipeIngredients?.includes(uuid))
  }, [recipe, ingredients])

  return (
    <div className="m-10 flex flex-col gap-4">
      <h1 className="text-3xl">{id}</h1>
      <div className="flex flex-row gap-4">
        <FormattedIngredientsList
          ingredients={filteredIngredients}
          ListItem={({ ingredient: { name } }) => <p>{name}</p>}
        />
      </div>
    </div>
  )
}
