import { router, publicProcedure } from "../trpc"
import { createIngredientSchema } from "schemas/ingredients"

export const ingredientsRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.ingredients.findMany()
  }),
  createIngredient: publicProcedure.input(createIngredientSchema).mutation(({ ctx, input }) => {
    return ctx.prisma.ingredients.create({
      data: input,
    })
  }),
})
