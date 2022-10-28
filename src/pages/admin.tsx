import { Ingredient, IngredientCategory } from "@prisma/client"
import { PrimaryButton } from "components/Button"
import { Layout } from "components/Layout"
import cuid from "cuid"
import type { NextPage } from "next"
import Head from "next/head"
import toast from "react-hot-toast"
import { trpc } from "utils/trpc"

// Protect this route when Auth is set up
const Admin: NextPage = () => (
  <>
    <Head>
      <title>Chocolating - Admin Panel</title>
    </Head>
    <Layout className="flex h-screen flex-col gap-10">
      <header className="m-auto mt-12">
        <h1 className="text-2xl">Admin</h1>
      </header>
      <main className="mx-10 flex-grow ">
        <section className="mx-10 mb-10 flex flex-col">
          <h2 className="text-2xl">Actions</h2>
          <p>Utilities only, press only if you know what to do</p>
          <PrimeDB />
        </section>
      </main>
    </Layout>
  </>
)

export default Admin

const DEFAULT_INGREDIENTS: Omit<Ingredient, "description">[] = [
  {
    id: cuid(),
    name: "Default Beans",
    category: IngredientCategory.COCOA_BEAN,
    fat_content: 46,
    sugar_content: 1,
    calories: 228,
  },
  {
    id: cuid(),
    name: "Default Butter",
    category: IngredientCategory.COCOA_BUTTER,
    fat_content: 100,
    sugar_content: 0,
    calories: 884,
  },
  {
    id: cuid(),
    name: "Default Whole Milk Powder",
    category: IngredientCategory.MILK,
    fat_content: 34,
    sugar_content: 14,
    calories: 497,
  },
  {
    id: cuid(),
    name: "Default Cane Sugar",
    category: IngredientCategory.SUGAR,
    fat_content: 0,
    sugar_content: 100,
    calories: 387,
  },
]

const PrimeDB = () => {
  const utils = trpc.useContext()
  const createIngredient = trpc.ingredients.createIngredient.useMutation({
    onSuccess: async ({ name }) => {
      toast.success(`${name} created successfully!`)
      await utils.ingredients.invalidate()
    },
    onError: (error) => toast.error(error.message),
  })

  const onClick = () => {
    for (const ingredient of DEFAULT_INGREDIENTS) {
      createIngredient.mutate(ingredient)
    }
  }

  return <PrimaryButton onClick={onClick}>Populate DB with default ingredients</PrimaryButton>
}
