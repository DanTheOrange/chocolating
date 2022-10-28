import { useRecipeStore } from "hooks/useRecipeStore"
import { trpc } from "utils/trpc"

export const IngredientsList = () => {
  const { ingredients } = useRecipeStore()
  const { data } = trpc.ingredients.getAll.useQuery()

  return data ? (
    <ul className="flex flex-col gap-2">
      {ingredients.map(({ ingredientId }) => (
        <li key={ingredientId} className="flex flex-row items-baseline justify-between gap-1">
          <p>{data.find(({ id }) => id === ingredientId)?.name}</p>
          <QuantityInput ingredientId={ingredientId} />
        </li>
      ))}
    </ul>
  ) : (
    <></>
  )
}

const QuantityInput = ({ ingredientId }: { ingredientId: string }) => {
  const { updateIngredientQuantity } = useRecipeStore()

  return (
    <input
      type="number"
      className="p-1"
      placeholder="quantity"
      onChange={(e) => updateIngredientQuantity(ingredientId, e.target.valueAsNumber)}
    />
  )
}
