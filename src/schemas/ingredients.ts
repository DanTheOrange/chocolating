import { IngredientCategory } from "@prisma/client"
import { z } from "zod"

export const createIngredientSchema = z.object({
  name: z.string().min(3, { message: "Ingredient names must be a minimum of three characters" }),
  category: z.nativeEnum(IngredientCategory),
  description: z.optional(
    z.string().max(500, { message: "Descriptions are limited to 500 characters" })
  ),
  fat_content: z
    .number()
    .min(0, { message: "Percentages can't be below 0%" })
    .max(100, { message: "Percentages can't be above 100%" }),
  sugar_content: z
    .number()
    .min(0, { message: "Percentages can't be below 0%" })
    .max(100, { message: "Percentages can't be above 100%" }),
  calories: z.number(),
})

export const updateIngredientSchema = z.object({
  id: z.string(),
  name: z.string().min(3, { message: "Ingredient names must be a minimum of three characters" }),
  category: z.nativeEnum(IngredientCategory),
  description: z.optional(
    z.string().max(500, { message: "Descriptions are limited to 500 characters" })
  ),
  fat_content: z
    .number()
    .min(0, { message: "Percentages can't be below 0%" })
    .max(100, { message: "Percentages can't be above 100%" }),
  sugar_content: z
    .number()
    .min(0, { message: "Percentages can't be below 0%" })
    .max(100, { message: "Percentages can't be above 100%" }),
  calories: z.number(),
})
