import { FormattedIngredientsList } from "components/FormattedIngredientsList"
import { AddIngredientModal } from "components/pages/ingredients/AddIngredientModal"
import { IngredientListItem } from "components/pages/ingredients/IngredientListItem"
import type { NextPage } from "next"
import Head from "next/head"
import { trpc } from "utils/trpc"

// TODO: try and style this page, it's basic but it works
const IngredientManager: NextPage = () => {
  const { data } = trpc.ingredients.getAll.useQuery()

  return (
    <>
      <Head>
        <title>Chocolating - Ingredient manager</title>
      </Head>

      <div className="m-10 flex flex-col gap-4">
        <h1 className="text-3xl">Ingredient manager</h1>
        <AddIngredientModal />
        {!!data && (
          <FormattedIngredientsList
            ListItem={IngredientListItem}
            ingredients={data}
            className="max-w-2xl"
          />
        )}
      </div>
    </>
  )
}

export default IngredientManager
