import { createRecipeSchema, deleteRecipeSchema, updateRecipeSchema } from "schemas/recipes"
import { z } from "zod"
import { router, publicProcedure } from "../trpc"

export const recipesRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.recipe.findMany()
  }),
  getById: publicProcedure.input(z.object({ id: z.string() })).query(({ ctx, input }) => {
    return ctx.prisma.recipe.findUnique({
      where: input,
    })
  }),
  createRecipe: publicProcedure.input(createRecipeSchema).mutation(({ ctx, input }) => {
    return ctx.prisma.recipe.create({
      data: input,
    })
  }),
  updateRecipe: publicProcedure.input(updateRecipeSchema).mutation(({ ctx, input }) => {
    return ctx.prisma.recipe.update({
      where: { id: input.id },
      data: input,
    })
  }),
  deleteRecipe: publicProcedure.input(deleteRecipeSchema).mutation(({ ctx, input }) => {
    return ctx.prisma.recipe.delete({
      where: input,
    })
  }),
})
