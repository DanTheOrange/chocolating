import { zodResolver } from "@hookform/resolvers/zod"
import { IngredientCategoriesNameMap, INGREDIENT_CATEGORIES } from "types/ingredients"
import { useForm } from "react-hook-form"
import { createIngredientSchema } from "schemas/ingredients"
import { trpc } from "utils/trpc"
import cn from "classnames"

// Loosely followed this example to get schema validation working.
// https://kitchen-sink.trpc.io/react-hook-form?file=feature%2Freact-hook-form%2Findex.tsx#content
export const AddIngredientForm = ({ onSubmit }: { onSubmit?: () => void }) => {
  const utils = trpc.useContext()
  const mutate = trpc.ingredients.createIngredient.useMutation({
    onSuccess: async () => {
      await utils.ingredients.invalidate()
    },
  })

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<typeof createIngredientSchema["_input"]>({
    resolver: zodResolver(createIngredientSchema, undefined),
  })

  const onFormSubmit = handleSubmit(async (data) => {
    await mutate.mutateAsync(data)
    onSubmit?.()
  })

  const watchDescription = watch("description")

  return (
    <form onSubmit={onFormSubmit} className="flex flex-col gap-3">
      <div className="flex flex-col gap-0.5">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" required {...register("name")} />
        {errors?.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      </div>

      <div className="flex flex-col gap-0.5">
        <label htmlFor="type">Type</label>
        <select id="type" {...register("type")}>
          {INGREDIENT_CATEGORIES.map((category) => (
            <option value={category} key={category}>
              {IngredientCategoriesNameMap.get(category)}
            </option>
          ))}
        </select>
        {errors?.type && <p>{errors.type.message}</p>}
      </div>

      <div className="flex flex-col gap-0.5">
        <label htmlFor="description">Description</label>
        <textarea id="description" required {...register("description")} />
        <div className="flex flex-row justify-between">
          <p className="text-sm text-red-500">
            {errors?.description && errors.description.message}
          </p>
          {watchDescription && (
            <p
              className={cn("self-end text-sm", {
                "font-semibold text-amber-600":
                  watchDescription.length >= 400 && watchDescription.length < 501,
                "font-bold text-red-500": watchDescription.length >= 501,
              })}
            >
              {watchDescription.length}/500
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-0.5">
        <label htmlFor="fat_content">Fat percentage</label>
        <input
          type="number"
          min={0}
          max={100}
          id="fat_content"
          required
          {...register("fat_content", {
            valueAsNumber: true,
          })}
        />
        {errors?.fat_content && (
          <p className="text-sm text-red-500">{errors.fat_content.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-0.5">
        <label htmlFor="sugar_content">Suger percentage</label>
        <input
          type="number"
          min={0}
          max={100}
          id="sugar_content"
          required
          {...register("sugar_content", {
            valueAsNumber: true,
          })}
        />
        {errors?.sugar_content && (
          <p className="text-sm text-red-500">{errors.sugar_content.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-0.5">
        <label htmlFor="calories">Calories</label>
        <input
          type="number"
          id="calories"
          required
          {...register("calories", {
            valueAsNumber: true,
          })}
        />
        {errors?.calories && <p className="text-sm text-red-500">{errors.calories.message}</p>}
        <p className="text-sm">Value per 100g</p>
      </div>

      <input
        className="mt-4 cursor-pointer rounded-md bg-gray-100 py-2 px-3 hover:bg-gray-200"
        type="submit"
      />
    </form>
  )
}
