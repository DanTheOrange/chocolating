import { IngredientsInRecipe, Recipe } from "@prisma/client"
import { updateRecipeSchema } from "schemas/recipes"
import create from "zustand"

// I want some code to interact easily across components on the create recipe page
// I don't want it to save to the database every time someone interacts
// mostly becasue it's pointless but also to save traffic.
// I need to figure out the best ways to interact with tRPC and the react-query tools
// At the moment I think it's just fetching data once with the auto updates off
// Then the saving functionality is in here and

updateRecipeSchema._type

type RecipeStore = {
  isDirty: boolean // data has been interacted with and needs saving
  lastSaved: string | undefined
  recipe: typeof updateRecipeSchema._type // having this type here is causing problems. maybe I should have the properties on this state?
  ingredients: IngredientsInRecipe[] // right now i've got this, but a list of just ingredients might be better
  updateRecipe: (recipe: Partial<Recipe>) => void
  addIngredient: (ingredientId: string) => void
  removeIngredient: (ingredientId: string) => void
  updateIngredientQuantity: (ingredientId: string, quantity: number) => void
  saved: () => void
}

export const useRecipeStore = create<RecipeStore>((set) => ({
  isDirty: false,
  lastSaved: undefined,
  recipe: { id: "", generated_description: "", generated_name: "", name: "", description: "" }, // bad default...
  ingredients: [],
  updateRecipe: (updatedRecipe) =>
    set(({ recipe }) => ({
      recipe: {
        ...recipe,
        ...Object.fromEntries(
          Object.entries(updatedRecipe).map(([k, v]) => [k, v === null ? undefined : v])
        ),
      },
    })),
  addIngredient: (ingredientId) =>
    set(({ ingredients, recipe }) => ({
      isDirty: true,
      ingredients: [
        ...new Set([...ingredients, { ingredientId, recipeId: recipe.id, quantity: 0 }]),
      ],
    })),
  removeIngredient: (ingredientId) =>
    set(({ ingredients }) => ({
      isDirty: true,
      ingredients: ingredients.filter((ingredient) => ingredient.ingredientId !== ingredientId),
    })),
  updateIngredientQuantity: (ingredientId, quantity) =>
    set(({ ingredients }) => ({
      isDirty: true,
      ingredients: ingredients.map((ingredient) =>
        ingredient.ingredientId === ingredientId ? { ...ingredient, quantity } : ingredient
      ),
    })),
  saved: () => set({ isDirty: false, lastSaved: new Date().toDateString() }),
}))
