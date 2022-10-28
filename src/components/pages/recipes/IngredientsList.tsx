import { useRecipeStore } from "hooks/useRecipeStore"
import { trpc } from "utils/trpc"

export const IngredientsList = () => {
  const { ingredients } = useRecipeStore()
  const { data } = trpc.ingredients.getAll.useQuery()

  return (
    data && (
      <ul>
        {ingredients.map(({ ingredientId }) => (
          <li key={ingredientId}>{data.find(({ id }) => id === ingredientId)?.name}</li>
        ))}
      </ul>
    )
  )
}
