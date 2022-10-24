// src/server/trpc/router/index.ts
import { router } from "../trpc"
import { ingredientsRouter } from "./ingredients"
import { authRouter } from "./auth"

export const appRouter = router({
  ingredients: ingredientsRouter,
  auth: authRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
