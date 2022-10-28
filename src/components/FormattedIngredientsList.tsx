import { IngredientCategoriesNameMap } from "types/ingredients"
import cn from "classnames"
import { Ingredient, IngredientCategory } from "@prisma/client"

export type TFormattedIngredientsListProps = React.ComponentProps<"ul"> & {
  ListItem: React.FC<{ ingredient: Ingredient }>
  ingredients: Ingredient[]
}

export const FormattedIngredientsList = ({
  ListItem,
  ingredients,
  className,
  ...props
}: TFormattedIngredientsListProps) => (
  <ul className={cn("flex flex-col gap-2", className)} {...props}>
    {Object.entries(IngredientCategory)
      .map(([_, v]) => v)
      .map((category) => {
        const data = ingredients.filter((ingredient) => ingredient.category === category)

        return (
          !!data.length && (
            <li key={category}>
              <p className="text-lg font-semibold">{IngredientCategoriesNameMap.get(category)}</p>
              <ul className="ml-2 flex flex-col gap-1">
                {data.map((ingredient) => (
                  <ListItem key={ingredient.id} ingredient={ingredient} />
                ))}
              </ul>
            </li>
          )
        )
      })}
  </ul>
)
