import { PrimaryButton } from "components/Button"
import { useRecipes } from "hooks/useRecipes"
import Link from "next/link"

export const RecipeList = () => {
  const { recipes } = useRecipes()

  if (!recipes)
    return (
      <>
        <p>No recipes yet</p>
        <Link href="/recipe-creator/new">
          <PrimaryButton as="a" className="w-fit">
            Make one
          </PrimaryButton>
        </Link>
      </>
    )

  return (
    <ul>
      {recipes.map(({ name }) => (
        <li>{name}</li>
      ))}
    </ul>
  )
}
