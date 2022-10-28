import { trpc } from "utils/trpc"
import Select, { ActionMeta, MultiValue } from "react-select"
import { useCallback, useMemo } from "react"
import { useRecipeStore } from "hooks/useRecipeStore"

export const IngredientSelector = () => {
  const { addIngredient, removeIngredient } = useRecipeStore()
  const { data } = trpc.ingredients.getAll.useQuery()

  const ingredientOptions = useMemo(() => {
    return data?.map(({ id, name }) => ({ value: id, label: name }))
  }, [data])

  const onChange = useCallback((_: MultiValue<any>, { option, removedValue }: ActionMeta<any>) => {
    if (option) addIngredient(option.value)
    if (removedValue) removeIngredient(removedValue.value)
  }, [])

  return (
    <Select
      id="add-ingredient-select"
      instanceId="add-ingredient-select"
      isMulti
      name="ingredients"
      options={ingredientOptions}
      onChange={onChange}
    />
  )
}
