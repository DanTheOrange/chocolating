import { IngredientCategory } from "@prisma/client"
import { useRecipeStore } from "hooks/useRecipeStore"
import { useMemo } from "react"
import { trpc } from "utils/trpc"

enum ChocolateTypes {
  NOT,
  UNKNOWN,
  RAW,
  DARK_CHOCOLATE,
  DARK_MILK_CHOCOLATE,
  MILK_CHOCOLATE,
  WHITE_CHOCOLATE,
}

const CHOCOLATE_TYPE_STRING_MAP = new Map<ChocolateTypes, string>([
  [ChocolateTypes.NOT, "This isn't chocolate"],
  [ChocolateTypes.UNKNOWN, "Unknown"],
  [ChocolateTypes.RAW, "Raw"],
  [ChocolateTypes.DARK_CHOCOLATE, "Dark Chocolate"],
  [ChocolateTypes.DARK_MILK_CHOCOLATE, "Dark Milk Chocolate"],
  [ChocolateTypes.MILK_CHOCOLATE, "Milk Chocolate"],
  [ChocolateTypes.WHITE_CHOCOLATE, "White Chocolate"],
])

export const RecipeInformation = () => {
  const { ingredients } = useRecipeStore()
  const { data } = trpc.ingredients.getAll.useQuery()

  const cocoaPercent = useMemo(() => {
    if (!data) return 0
    const { total, cocoa } = ingredients.reduce(
      (acc, { quantity, ingredientId }) => ({
        total: acc.total + quantity,
        cocoa:
          acc.cocoa +
          (data.find(({ id }) => id === ingredientId)!.category === IngredientCategory.COCOA_BEAN ||
          data.find(({ id }) => id === ingredientId)!.category === IngredientCategory.COCOA_BUTTER
            ? quantity
            : 0),
      }),
      { total: 0, cocoa: 0 }
    )

    return (cocoa / total) * 100
  }, [ingredients, data])

  const chocolateType = useMemo(() => {
    if (!data) return ChocolateTypes.UNKNOWN
    const containsMilk = ingredients.some(({ ingredientId }) =>
      data.find(({ category, id }) => id === ingredientId && category === IngredientCategory.MILK)
    )
    const containsCocoSolids = ingredients.some(({ ingredientId }) =>
      data.find(
        ({ category, id }) => id === ingredientId && category === IngredientCategory.COCOA_BEAN
      )
    )
    const containsCocoButter = ingredients.some(({ ingredientId }) =>
      data.find(
        ({ category, id }) => id === ingredientId && category === IngredientCategory.COCOA_BUTTER
      )
    )

    if (!containsCocoSolids && !containsCocoButter) return ChocolateTypes.NOT
    else if (containsCocoSolids) {
      if (cocoaPercent === 100) return ChocolateTypes.RAW
      if (!containsMilk) return ChocolateTypes.DARK_CHOCOLATE
      if (containsMilk && cocoaPercent >= 55) return ChocolateTypes.DARK_MILK_CHOCOLATE
      if (containsMilk && cocoaPercent < 55) return ChocolateTypes.MILK_CHOCOLATE
    } else return ChocolateTypes.WHITE_CHOCOLATE

    return ChocolateTypes.UNKNOWN
  }, [cocoaPercent, ingredients, data])

  return (
    <div>
      <p>Chocolate type: {CHOCOLATE_TYPE_STRING_MAP.get(chocolateType)}</p>
      <p>Chocolate percentage: {(cocoaPercent | 0).toFixed()}%</p>
    </div>
  )
}
