import { Ingredient, IngredientsInRecipe } from "@prisma/client"

const NUTRITION_STRING_MAP = new Map<
  Pick<Ingredient, "fat_content" | "calories" | "sugar_content">,
  string
>([
  ["fat_content", "Fat"],
  ["sugar_content", "Sugar"],
  ["calories", "Calories"],
])

type NutritionBlockProps = {
  ingredients: Ingredient[]
  IngredientsInRecipe: IngredientsInRecipe[]
}

export const NutritionBlock = ({ ingredients, IngredientsInRecipe }: NutritionBlockProps) => {
  return (
    <section className="border-2 border-black bg-white p-2">
      <h2 className="text-3xl font-bold tracking-tight">Nutrition Facts</h2>
      <p>Serving size (100g)</p>
      <hr className="my-2 h-2 border-0 bg-black" />
      <p>Amount Per Serving</p>

      <hr className="border-1 my-2 h-1 bg-black" />
    </section>
  )
}
