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
