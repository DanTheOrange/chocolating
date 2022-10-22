import { PrimaryButton } from "components/Button"
import { useRecipes } from "hooks/useRecipes"
import Link from "next/link"
import { v4 as uuidv4 } from "uuid"

// Temporarily I'll make a new recipe by going to an ID route.
// This isn't good.
// TODO: Fix this when there are accounts and a db
export const RecipeList = () => {
  const { recipes } = useRecipes()

  if (!recipes)
    return (
      <>
        <p>No recipes yet</p>
        <Link href={`/recipes/${uuidv4()}`}>
          <PrimaryButton as="a" className="w-fit">
            Make one
          </PrimaryButton>
        </Link>
      </>
    )

  return (
    <>
      <ul>
        {recipes.map(({ name }) => (
          <li>{name}</li>
        ))}
      </ul>
      <Link href={`/recipes/${uuidv4()}`}>
        <PrimaryButton as="a" className="w-fit">
          Create new recipe
        </PrimaryButton>
      </Link>
    </>
  )
}
