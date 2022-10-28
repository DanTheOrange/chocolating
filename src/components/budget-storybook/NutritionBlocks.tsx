import { NutritionBlock } from "components/NutritionBlock"

export const NutritionBlocks = () => (
  <>
    <h2 className="text-xl">Buttons</h2>
    <div className="flex flex-row flex-wrap gap-8">
      <NutritionBlock
        ingredients={[
          {
            id: "1",
            name: "",
            category: "COCOA_BEAN",
            description: "",
            fat_content: 10,
            sugar_content: 10,
            calories: 100,
          },
          {
            id: "2",
            name: "",
            category: "COCOA_BUTTER",
            description: "",
            fat_content: 12,
            sugar_content: 10,
            calories: 100,
          },
          {
            id: "3",
            name: "",
            category: "FLAVOURING",
            description: "",
            fat_content: 10,
            sugar_content: 10,
            calories: 100,
          },
          {
            id: "4",
            name: "",
            category: "MILK",
            description: "",
            fat_content: 10,
            sugar_content: 10,
            calories: 100,
          },
        ]}
        ingredientsInRecipe={[
          {
            ingredientId: "1",
            recipeId: "1",
            quantity: 10,
          },
          {
            ingredientId: "2",
            recipeId: "1",
            quantity: 30,
          },
          {
            ingredientId: "3",
            recipeId: "1",
            quantity: 30,
          },
          {
            ingredientId: "1",
            recipeId: "1",
            quantity: 30,
          },
        ]}
      />
    </div>
  </>
)
