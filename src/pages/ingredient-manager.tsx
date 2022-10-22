import { FormattedIngredientsList } from "components/FormattedIngredientsList"
import { AddIngredientModal } from "components/pages/ingredient-manager/AddIngredientModal"
import { IngredientListItem } from "components/pages/ingredient-manager/IngredientListItem"
import type { NextPage } from "next"
import Head from "next/head"
import { IngredientsProvider, useIngredients } from "../hooks/useIngredients"

// TODO: try and style this page, it's basic but it works
const IngredientManager: NextPage = () => (
  <IngredientsProvider>
    <Head>
      <title>Chocolating - Ingredient manager</title>
    </Head>

    <div className="m-10 flex flex-col gap-4">
      <h1 className="text-3xl">Ingredient manager</h1>
      <AnnoyingNestedComponentBecasueContext />
    </div>
  </IngredientsProvider>
)

export default IngredientManager

const AnnoyingNestedComponentBecasueContext = () => {
  const { ingredients } = useIngredients()

  return (
    <>
      <AddIngredientModal />
      <FormattedIngredientsList
        ListItem={IngredientListItem}
        ingredients={ingredients}
        className="max-w-2xl"
      />
    </>
  )
}
