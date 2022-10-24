import { IngredientCategoriesNameMap, INGREDIENT_CATEGORIES } from "types/ingredients"
import cn from "classnames"
import { Ingredients } from "@prisma/client"

export type TFormattedIngredientsListProps = React.ComponentProps<"ul"> & {
  ListItem: React.FC<{ ingredient: Ingredients }>
  ingredients: Ingredients[]
}

export const FormattedIngredientsList = ({
  ListItem,
  ingredients,
  className,
  ...props
}: TFormattedIngredientsListProps) => (
  <ul className={cn("flex flex-col gap-2", className)} {...props}>
    {INGREDIENT_CATEGORIES.map((category) => {
      const data = ingredients.filter(({ type }) => type === category)

      return (
        !!data.length && (
          <li key={category}>
            <p className="text-lg font-semibold">{IngredientCategoriesNameMap.get(category)}</p>
            <ul className="ml-2 flex flex-col gap-1">
              {data.map((ingredient) => (
                <li key={ingredient.id} className="flex flex-col">
                  {<ListItem ingredient={ingredient} />}
                </li>
              ))}
            </ul>
          </li>
        )
      )
    })}
  </ul>
)
