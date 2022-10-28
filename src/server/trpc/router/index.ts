// src/server/trpc/router/index.ts
import { router } from "../trpc"
import { ingredientsRouter } from "./ingredients"
import { recipesRouter } from "./recipes"
import { authRouter } from "./auth"

export const appRouter = router({
  ingredients: ingredientsRouter,
  recipes: recipesRouter,
  auth: authRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
