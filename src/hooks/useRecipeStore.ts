import { IngredientsInRecipe, Recipe } from "@prisma/client"
import create from "zustand"

// I want some code to interact easily across components on the create recipe page
// I don't want it to save to the database every time someone interacts
// mostly becasue it's pointless but also to save traffic.
// I need to figure out the best ways to interact with tRPC and the react-query tools
// At the moment I think it's just fetching data once with the auto updates off
// Then the saving functionality is in here and

type RecipeStore = {
  isDirty: boolean // data has been interacted with and needs saving
  recipe: Recipe // having this type here is causing problems. maybe I should have the properties on this state?
  ingredients: IngredientsInRecipe[]
  updateRecipe: (recipe: Partial<Recipe>) => void
  addIngredient: (ingredientId: string) => void
  removeIngredient: (ingredientId: string) => void
  updateIngredientQuantity: (ingredientId: string, quantity: number) => void
}

export const useRecipeStore = create<RecipeStore>((set) => ({
  isDirty: false,
  recipe: { id: "", generated_description: "", generated_name: "", name: "", description: "" }, // bad default...
  ingredients: [],
  updateRecipe: (updatedRecipe) =>
    set(({ recipe }) => ({ recipe: { ...recipe, ...updatedRecipe } })),
  addIngredient: (ingredientId) =>
    set(({ ingredients, recipe }) => ({
      ingredients: [
        ...new Set([...ingredients, { ingredientId, recipeId: recipe.id, quantity: 0 }]),
      ],
    })),
  removeIngredient: (ingredientId) =>
    set(({ ingredients }) => ({
      ingredients: ingredients.filter((ingredient) => ingredient.ingredientId === ingredientId),
    })),
  updateIngredientQuantity: (ingredientId, quantity) =>
    set(({ ingredients }) => ({
      ingredients: ingredients.map((ingredient) =>
        ingredient.ingredientId === ingredientId ? { ...ingredient, quantity } : ingredient
      ),
    })),
}))
