import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import constate from "constate"

const LOCALSTORAGE_INGREDIENT_KEY = "ingredients"

// Some basic types until there is a backend
export const INGREDIENT_CATEGORIES = [
  "cocoa",
  "cocoabutter",
  "creamer",
  "sweetener",
  "flavoring",
] as const

export type TIngredientCategory = typeof INGREDIENT_CATEGORIES[number]

export const IngredientCategoriesNameMap = new Map<TIngredientCategory, string>([
  ["cocoa", "Cocoa Beans"],
  ["cocoabutter", "Cocoa Butter"],
  ["creamer", "Milk / Milk alternative"],
  ["sweetener", "Sugar / Sweetener"],
  ["flavoring", "Flavouring"],
])

type TNutritionalInformation = {
  fat: number // percentage
  sugar: number // percentage
  calories: number // value
}

export type TIngredient = {
  uuid: string
  type: TIngredientCategory
  name: string
  nutrition: TNutritionalInformation
}

const defaultIngredients: TIngredient[] = [
  {
    uuid: uuidv4(),
    // TODO: add more data later
    // https://nutritiondata.self.com/facts/custom/2277624/0
    type: "cocoa",
    name: "Default Cocoa Beans",
    nutrition: {
      fat: 42.9,
      sugar: 0,
      calories: 464,
    },
  },
  {
    uuid: uuidv4(),
    // TODO: add more data later
    // https://nutritiondata.self.com/facts/fats-and-oils/570/2
    type: "cocoabutter",
    name: "Default Cocoa Butter",
    nutrition: {
      fat: 100,
      sugar: 0,
      calories: 884,
    },
  },
  {
    uuid: uuidv4(),
    type: "creamer",
    name: "Default Whole Milk Powder",
    nutrition: {
      fat: 28.4,
      sugar: 39,
      calories: 510,
    },
  },
  {
    uuid: uuidv4(),
    // TODO: add more data later
    // https://nutritiondata.self.com/facts/custom/2089335/2
    type: "sweetener",
    name: "Default Cane Sugar",
    nutrition: {
      fat: 0,
      sugar: 100,
      calories: 375,
    },
  },
]

export type TUseIngredients = ReturnType<typeof useIngredientsHook>

// For now this is localstorage,
// as soon as I do auth and DB stuff it'll be that instead
// Because of that it oesn't matter that this is always an instance
// It'll only ever be in one place on the screen.
export const useIngredientsHook = () => {
  // This doesn't need to be state, but it makes the mental gymnastics easier before there is a db
  const [ingredients, setIngredients] = useState<TIngredient[]>([])

  useEffect(() => {
    const localIngredients = JSON.parse(localStorage.getItem(LOCALSTORAGE_INGREDIENT_KEY)!)
    if (localIngredients.length === 0) resetToDefaultIngredients()
    else setIngredients(localIngredients)
  }, [])

  const resetToDefaultIngredients = () => {
    // independently set state and local storage - fine for now as temporary
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCALSTORAGE_INGREDIENT_KEY, JSON.stringify(defaultIngredients))
    }
    setIngredients(defaultIngredients)
  }

  const addIngredient = (newIngredient: Omit<TIngredient, "uuid">) => {
    const newIngredients = [...ingredients, { uuid: uuidv4(), ...newIngredient }]

    // independently set state and local storage - fine for now as temporary
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCALSTORAGE_INGREDIENT_KEY, JSON.stringify(newIngredients))
    }
    setIngredients(newIngredients)
  }

  const deleteIngredient = (uuidToDelete: string) => {
    const newIngredients = ingredients.filter(({ uuid }) => uuid !== uuidToDelete)

    // independently set state and local storage - fine for now as temporary
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCALSTORAGE_INGREDIENT_KEY, JSON.stringify(newIngredients))
    }
    setIngredients(newIngredients)
  }

  return {
    addIngredient,
    deleteIngredient,
    ingredients,
  }
}

export const [IngredientsProvider, useIngredients] = constate(useIngredientsHook)
