import { Recipe } from "@prisma/client"
import {
  // DangerButton,
  PrimaryButton,
} from "components/Button"
import Link from "next/link"
// import { useCallback } from "react"
// import toast from "react-hot-toast"
// import { ImSpinner2 } from "react-icons/im"
// import { trpc } from "utils/trpc"

// it was this or prop drilling and I didn't mind either way tbh
// either way deleting is awful, I'll do it another time
export const RecipeList = ({ recipes }: { recipes: Recipe[] }) => {
  // const utils = trpc.useContext()

  // const { mutate, isLoading } = trpc.recipes.deleteRecipe.useMutation({
  //   onSuccess: async () => {
  //     toast.success("Deleted successfully!")
  //     await utils.recipes.invalidate()
  //   },
  //   onError: () => toast.error("Delete failed!"),
  // })

  // const deleteFn = useCallback((id: string) => mutate({ id }), [mutate])

  return (
    <ul className="flex flex-col gap-2 sm:w-full md:max-w-xl">
      {recipes.map((recipe) => (
        <li key={recipe.id} className="flex flex-row gap-2">
          <p className="flex-grow">{recipe.name}</p>
          <Link href={`/recipes/${recipe.id}`} passHref>
            <PrimaryButton as="a" size="custom" className="text-normal h-fit px-2">
              Edit
            </PrimaryButton>
          </Link>
          {/* <DangerButton
            size="custom"
            className="text-normal w-15 h-fit px-2"
            onClick={() => deleteFn(recipe.id)}
            disabled={isLoading}
          >
            {isLoading ? <ImSpinner2 className="animate-spin text-2xl text-inherit" /> : "Delete"}
          </DangerButton> */}
        </li>
      ))}
    </ul>
  )
}
