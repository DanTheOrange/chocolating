import { trpc } from "utils/trpc"
import Select, { ActionMeta, MultiValue } from "react-select"
import { useCallback, useMemo } from "react"
import { useRecipeStore } from "hooks/useRecipeStore"

export const IngredientSelector = () => {
  const { ingredients, addIngredient, removeIngredient, resetIngredeients } = useRecipeStore()
  const { data } = trpc.ingredients.getAll.useQuery()

  const ingredientOptions = useMemo(() => {
    return data?.map(({ id, name }) => ({ value: id, label: name }))
  }, [data])

  const defaultValues = useMemo(() => {
    return ingredientOptions?.filter(
      ({ value }) => !!ingredients.find(({ ingredientId }) => ingredientId === value)
    )
  }, [ingredientOptions, ingredients])

  const onChange = useCallback(
    (_: MultiValue<any>, { action, option, removedValue }: ActionMeta<any>) => {
      if (option) addIngredient(option.value)
      if (removedValue) removeIngredient(removedValue.value)
      if (action === "clear") resetIngredeients()
    },
    [addIngredient, removeIngredient]
  )

  return (
    <Select
      id="add-ingredient-select"
      instanceId="add-ingredient-select"
      defaultValue={defaultValues}
      isMulti
      name="ingredients"
      options={ingredientOptions}
      onChange={onChange}
    />
  )
}
