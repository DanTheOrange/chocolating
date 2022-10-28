import { router, publicProcedure } from "../trpc"
import { createIngredientSchema, updateIngredientSchema } from "schemas/ingredients"
import { z } from "zod"

export const ingredientsRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.ingredient.findMany()
  }),
  getById: publicProcedure.input(z.object({ id: z.string() })).query(({ ctx, input }) => {
    return ctx.prisma.ingredient.findUnique({
      where: {
        id: input.id,
      },
    })
  }),
  getByIdList: publicProcedure.input(z.array(z.string())).query(({ ctx, input }) => {
    return ctx.prisma.ingredient.findMany({
      where: {
        id: { in: input },
      },
    })
  }),
  createIngredient: publicProcedure.input(createIngredientSchema).mutation(({ ctx, input }) => {
    return ctx.prisma.ingredient.create({
      data: input,
    })
  }),
  updateIngredient: publicProcedure.input(updateIngredientSchema).mutation(({ ctx, input }) => {
    return ctx.prisma.ingredient.update({
      where: { id: input.id },
      data: input,
    })
  }),
})
