import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { TIngredient } from "./useIngredients"
import constate from "constate"
const LOCALSTORAGE_RECIPE_KEY = "recipes"

// Some basic types until there is a backend
type TIngredientWithQuantity = TIngredient & {
  quantity: number // percentage - the ui can handle fancy grams to percentage conversions if needed
}

type TRecipe = {
  uuid: string
  name: string
  ingredients: TIngredientWithQuantity
}

export type TUseIngredients = ReturnType<typeof useRecipesHook>

// For now this is localstorage,
// as soon as I do auth and DB stuff it'll be that instead
// Because of that it oesn't matter that this is always an instance
// It'll only ever be in one place on the screen.
export const useRecipesHook = () => {
  // This doesn't need to be state, but it makes the mental gymnastics easier before there is a db
  const [recipes, setRecipes] = useState<TRecipe[]>([])

  useEffect(() => {
    const localRecipes = JSON.parse(localStorage.getItem(LOCALSTORAGE_RECIPE_KEY)!)
    setRecipes(localRecipes)
  }, [])

  const addRecipe = (newRecipe: Omit<TRecipe, "uuid">) => {
    const newRecipes = [...recipes, { uuid: uuidv4(), ...newRecipe }]

    // independently set state and local storage - fine for now as temporary
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCALSTORAGE_RECIPE_KEY, JSON.stringify(newRecipes))
    }
    setRecipes(newRecipes)
  }

  const deleteRecipe = (uuidToDelete: string) => {
    const newRecipes = recipes.filter(({ uuid }) => uuid !== uuidToDelete)

    // independently set state and local storage - fine for now as temporary
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCALSTORAGE_RECIPE_KEY, JSON.stringify(newRecipes))
    }
    setRecipes(newRecipes)
  }

  return {
    addRecipe,
    deleteRecipe,
    recipes,
  }
}

export const [RecipesProvider, useRecipes] = constate(useRecipesHook)
