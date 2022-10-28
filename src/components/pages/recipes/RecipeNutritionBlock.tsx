import { NutritionBlock } from "components/NutritionBlock"
import { useRecipeStore } from "hooks/useRecipeStore"
import { trpc } from "utils/trpc"

export const RecipeNutritionBlock = () => {
  const { ingredients } = useRecipeStore()
  const { data } = trpc.ingredients.getAll.useQuery()

  return data ? <NutritionBlock ingredients={data} ingredientsInRecipe={ingredients} /> : <></>
}
