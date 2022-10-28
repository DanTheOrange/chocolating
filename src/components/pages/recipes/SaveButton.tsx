import { PrimaryButton } from "components/Button"
import { useRecipeStore } from "hooks/useRecipeStore"
import { useCallback } from "react"
import toast from "react-hot-toast"
import { ImSpinner2 } from "react-icons/im"
import { trpc } from "utils/trpc"

export const SaveButton = ({ refetch }: { refetch: () => void }) => {
  const { isDirty, recipe } = useRecipeStore()
  const utils = trpc.useContext()

  console.log(isDirty)

  const updateRecipe = trpc.recipes.updateRecipe.useMutation({
    onSuccess: async () => {
      toast.success("Updated successfully!")
      await utils.recipes.invalidate()
      await refetch()
    },
    onError: () => toast.error("Update failed!"),
  })

  const onClick: () => void = useCallback(() => {
    updateRecipe.mutate(recipe)
  }, [updateRecipe.mutate, recipe])

  return (
    <PrimaryButton
      className="flex w-32 justify-center"
      isDisabled={!isDirty || updateRecipe.isLoading}
      onClick={onClick}
    >
      {updateRecipe.isLoading ? (
        <ImSpinner2 className="animate-spin text-2xl text-inherit" />
      ) : (
        "Save"
      )}
    </PrimaryButton>
  )
}
