import { Ingredient, IngredientsInRecipe } from "@prisma/client"
import { Fragment, useMemo } from "react"

const NUTRITION_STRING_MAP = new Map<keyof Ingredient, string>([
  ["fat_content", "Fat"],
  ["sugar_content", "Sugar"],
])

type NutritionBlockProps = {
  ingredients: Ingredient[]
  ingredientsInRecipe: IngredientsInRecipe[]
}

export const NutritionBlock = ({ ingredients, ingredientsInRecipe }: NutritionBlockProps) => {
  const { calories, ...stats } = useMemo(() => {
    const totalIngredientQuantity = ingredientsInRecipe.reduce(
      (total, { quantity }) => total + quantity,
      0
    )

    return ingredientsInRecipe.reduce(
      (totals, currentIngredient) => {
        const percentageOfTotalIngredients = currentIngredient.quantity / totalIngredientQuantity
        const ingredient = ingredients.find((i) => i.id === currentIngredient.ingredientId)!

        return {
          calories: totals.calories + ingredient.calories * percentageOfTotalIngredients,
          fat_content: totals.fat_content + ingredient.fat_content * percentageOfTotalIngredients,
          sugar_content:
            totals.sugar_content + ingredient.sugar_content * percentageOfTotalIngredients,
        }
      },
      { calories: 0, fat_content: 0, sugar_content: 0 } as Pick<
        Ingredient,
        "calories" | "fat_content" | "sugar_content"
      >
    )
  }, [ingredients, ingredientsInRecipe])

  return (
    <section className="border-2 border-black bg-white p-2">
      <h2 className="text-3xl font-bold tracking-tight">Nutrition Facts</h2>
      <p>Serving size (100g)</p>
      <hr className="my-2 h-2 border-0 bg-black" />
      <p>Amount Per Serving</p>
      <div className="flex flex-row justify-between">
        <p>Calories {calories.toFixed()}</p>
        <p className="text-end">% Daily Value*</p>
      </div>
      <hr className="border-1 my-2 h-1 bg-black" />
      <div className="grid grid-cols-2">
        {Object.entries(stats).map(([key, value]) => (
          <Fragment key={key}>
            <p>
              <span className="font-bold">{NUTRITION_STRING_MAP.get(key as keyof Ingredient)}</span>
              &nbsp;{value.toFixed()}g
            </p>
            <p className="text-end">TODO</p>
          </Fragment>
        ))}
      </div>
      <hr className="border-1 my-2 h-1 bg-black" />
      <p className="text-sm">*Daily values not worked out yet</p>
    </section>
  )
}
