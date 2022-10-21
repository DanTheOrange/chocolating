import { useForm } from "react-hook-form"
import {
  INGREDIENT_CATEGORIES,
  IngredientCategoriesNameMap,
  TIngredient,
  useIngredients,
} from "../../../hooks/useIngredients"

const requiredMessage = "This field is required"

export const AddIngredientForm = ({ onSubmit }: { onSubmit?: () => void }) => {
  const { addIngredient } = useIngredients()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<TIngredient, "uuid">>()

  const onFormSubmit = handleSubmit((data) => {
    addIngredient(data)
    onSubmit?.()
  })

  return (
    <form onSubmit={onFormSubmit} className="flex flex-col gap-2">
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
        {INGREDIENT_CATEGORIES.map((category) => (
          <option value={category} key={category}>
            {IngredientCategoriesNameMap.get(category)}
          </option>
        ))}
      </select>
      {errors?.type && <p>{errors.type.message}</p>}

      <label htmlFor="nutrition.fat">Fat percentage</label>
      <input
        type="number"
        min={0}
        max={100}
        id="nutrition.fat"
        required
        {...register("nutrition.fat", {
          required: { value: true, message: requiredMessage },
          min: { value: 0, message: "Percentages can't be below 0." },
          max: { value: 100, message: "Percentages can't be above 100." },
        })}
      />
      {errors?.name && <p className="text-red-500">{errors.name.message}</p>}

      <label htmlFor="nutrition.sugar">Suger percentage</label>
      <input
        type="number"
        min={0}
        max={100}
        id="nutrition.sugar"
        required
        {...register("nutrition.sugar", {
          required: { value: true, message: requiredMessage },
          min: { value: 0, message: "Percentages can't be below 0." },
          max: { value: 100, message: "Percentages can't be above 100." },
        })}
      />
      {errors?.name && <p className="text-red-500">{errors.name.message}</p>}

      <label htmlFor="nutrition.calories">Calories</label>
      <input
        type="number"
        id="nutrition.calories"
        required
        {...register("nutrition.calories", {
          required: { value: true, message: requiredMessage },
        })}
      />
      {errors?.name && <p className="text-red-500">{errors.name.message}</p>}
      <p>Calories per 100g</p>

      <input
        className="mt-4 cursor-pointer rounded-md bg-gray-100 py-2 px-3 hover:bg-gray-200"
        type="submit"
      />
    </form>
  )
}
