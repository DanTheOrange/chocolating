import { z } from "zod"

export const createRecipeSchema = z.object({
  name: z.string().min(3, { message: "Recipe names must be a minimum of three characters" }),
})

export const updateRecipeSchema = z.object({
  id: z.string(),
  name: z.string().min(3, { message: "Recipe names must be a minimum of three characters" }),
  generated_name: z.optional(z.string()),
  description: z.optional(z.string()),
  generated_description: z.optional(z.string()),
})

export const deleteRecipeSchema = z.object({
  id: z.string(),
})
