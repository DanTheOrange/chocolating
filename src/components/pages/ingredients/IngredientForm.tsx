import { zodResolver } from "@hookform/resolvers/zod"
import { IngredientCategoriesNameMap, INGREDIENT_CATEGORIES } from "types/ingredients"
import { useForm } from "react-hook-form"
import { createIngredientSchema, updateIngredientSchema } from "schemas/ingredients"
import { trpc } from "utils/trpc"
import cn from "classnames"
import { Ingredient } from "@prisma/client"
import { PrimaryButton } from "components/Button"
import { ImSpinner2 } from "react-icons/im"
import toast from "react-hot-toast"

// This all works fine. But both TS and myself are unhappy
// I think I need to rethink architecture for forms
// either single use forms configured where needed
// or understand the types better and how to change the schema/fields at will
// the former is simple and easy to read, the latter is more powerful and would lead to a faster dx
// though the latter would require a lot more initial input to get going.

type CreateOrUpdate<T extends Ingredient | undefined> = T extends Ingredient
  ? typeof updateIngredientSchema["_input"]
  : typeof createIngredientSchema["_input"]

type TIngredientFormProps<T extends Ingredient | undefined> = {
  defaultValues?: T
  onSubmit?: () => void
}

// Loosely followed this example to get schema validation working.
// https://kitchen-sink.trpc.io/react-hook-form?file=feature%2Freact-hook-form%2Findex.tsx#content
export const IngredientForm = <T extends Ingredient | undefined>({
  defaultValues,
  onSubmit,
}: TIngredientFormProps<T>) => {
  const utils = trpc.useContext()

  // this isn't great
  const mutate = defaultValues
    ? trpc.ingredients.updateIngredient.useMutation({
        onSuccess: async () => {
          toast.success("Updated successfully!")
          await utils.ingredients.invalidate()
        },
        onError: () => toast.error("Update failed!"),
      })
    : trpc.ingredients.createIngredient.useMutation({
        onSuccess: async () => {
          toast.success("Created successfully!")
          await utils.ingredients.invalidate()
        },
        onError: () => toast.error("Update failed!"),
      })

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateOrUpdate<T>>({
    // @ts-expect-error: technically Ingredient and typeof updateIngredientSchema["_input"] are different somehow
    defaultValues,
    resolver: zodResolver(
      defaultValues ? updateIngredientSchema : createIngredientSchema,
      undefined
    ),
  })

  const onFormSubmit = handleSubmit(async (data) => {
    // @ts-expect-error: this is an odd one too. It'll only have id if it's in the form.
    await mutate.mutateAsync(data)
    onSubmit?.()
  })

  // @ts-expect-error: pretty sure this is a react-hook-form type problem
  const watchDescription = watch("description")

  return (
    <form onSubmit={onFormSubmit} className="flex flex-col gap-3">
      <div className="flex flex-col gap-0.5">
        <label htmlFor="name">Name</label>
        {/* @ts-expect-error: pretty sure this is a react-hook-form type problem */}
        <input type="text" id="name" required {...register("name")} />
        {/* @ts-expect-error: pretty sure this is a react-hook-form type problem */}
        {errors?.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      </div>

      {defaultValues && (
        <div className="hidden">
          {/* @ts-expect-error: pretty sure this is a react-hook-form type problem */}
          <input type="text" id="id" required {...register("id")} />
        </div>
      )}

      <div className="flex flex-col gap-0.5">
        <label htmlFor="type">Type</label>
        {/* @ts-expect-error: pretty sure this is a react-hook-form type problem> */}
        <select id="type" {...register("type")}>
          {INGREDIENT_CATEGORIES.map((category) => (
            <option value={category} key={category}>
              {IngredientCategoriesNameMap.get(category)}
            </option>
          ))}
        </select>
        {/* @ts-expect-error: pretty sure this is a react-hook-form type problem */}
        {errors?.type && <p>{errors.type.message}</p>}
      </div>

      <div className="flex flex-col gap-0.5">
        <label htmlFor="description">Description</label>
        {/* @ts-expect-error: pretty sure this is a react-hook-form type problem */}
        <textarea id="description" {...register("description")} />
        <div className="flex flex-row justify-between">
          <p className="text-sm text-red-500">
            {/* @ts-expect-error: pretty sure this is a react-hook-form type problem */}
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
          // @ts-expect-error: pretty sure this is a react-hook-form type problem
          {...register("fat_content", {
            valueAsNumber: true,
          })}
        />
        {errors?.fat_content && (
          // @ts-expect-error: pretty sure this is a react-hook-form type problem
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
          // @ts-expect-error: pretty sure this is a react-hook-form type problem
          {...register("sugar_content", {
            valueAsNumber: true,
          })}
        />
        {errors?.sugar_content && (
          // @ts-expect-error: pretty sure this is a react-hook-form type problem
          <p className="text-sm text-red-500">{errors.sugar_content.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-0.5">
        <label htmlFor="calories">Calories</label>
        <input
          type="number"
          id="calories"
          required
          // @ts-expect-error: pretty sure this is a react-hook-form type problem
          {...register("calories", {
            valueAsNumber: true,
          })}
        />
        {/* @ts-expect-error: pretty sure this is a react-hook-form type problem */}
        {errors?.calories && <p className="text-sm text-red-500">{errors.calories.message}</p>}
        <p className="text-sm">Value per 100g</p>
      </div>

      <PrimaryButton
        className="flex w-24 justify-center"
        type="submit"
        isDisabled={mutate.isLoading}
      >
        {mutate.isLoading ? (
          <ImSpinner2 className="animate-spin text-2xl text-inherit" />
        ) : (
          "Submit"
        )}
      </PrimaryButton>
    </form>
  )
}
