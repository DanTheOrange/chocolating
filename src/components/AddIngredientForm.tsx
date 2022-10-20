import { useForm } from "react-hook-form"
import {
  IngredientCategories,
  IngredientCategoriesNameMap,
  TIngredient,
} from "../hooks/useIngredients"

const requiredMessage = "This field is required"

export const AddIngredientForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<TIngredient, "uuid">>()

  const onSubmit = handleSubmit((data) => console.log(data))

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2">
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        required
        {...register("name", {
          required: { value: true, message: requiredMessage },
        })}
      />
      {errors?.name && <p className="text-red-500">{errors.name.message}</p>}

      <label htmlFor="type">Type</label>
      <select
        id="type"
        {...register("type", {
          required: { value: true, message: requiredMessage }, // shouldn't be needed
        })}
      >
        {IngredientCategories.map((category) => (
          <option value={category} key={category}>
            {IngredientCategoriesNameMap.get(category)}
          </option>
        ))}
      </select>
      {errors?.type && <p>{errors.type.message}</p>}

      <input
        className="cursor-pointer rounded-md bg-gray-100 py-2 px-3 hover:bg-gray-200"
        type="submit"
      />
    </form>
  )
}
