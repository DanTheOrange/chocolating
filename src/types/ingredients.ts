import { IngredientCategory } from "@prisma/client"

export const IngredientCategoriesNameMap = new Map<IngredientCategory, string>([
  ["COCOA_BEAN", "Cocoa Beans"],
  ["COCOA_BUTTER", "Cocoa Butter"],
  ["MILK", "Milk / Milk alternative"],
  ["SUGAR", "Sugar / Sweetener"],
  ["FLAVOURING", "Flavouring"],
])
