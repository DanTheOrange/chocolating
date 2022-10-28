import { z } from "zod"
import { publicProcedure, router } from "../trpc"

export const recipesRouter = router({
  getByRecipeId: publicProcedure.input(z.object({ id: z.string() })).query(({ ctx, input }) => {
    return ctx.prisma.recipe.findUnique({
      where: input,
    })
  }),
})
