import { useMemo } from "react"
import {
  IngredientCategoriesNameMap,
  INGREDIENT_CATEGORIES,
  TIngredient,
  TIngredientCategory,
  useIngredients,
} from "../hooks/useIngredients"
import cn from "classnames"

type TFormattedIngredientsListProps = React.ComponentProps<"ul"> & {
  ListItem: React.FC<{ ingredient: TIngredient }>
}

export const FormattedIngredientsList = ({
  ListItem,
  className,
  ...props
}: TFormattedIngredientsListProps) => {
  const { beans, butters, flavorings, milks, sugars } = useIngredients()

  const ListMap = useMemo(
    () =>
      new Map<TIngredientCategory, { title: string; data: TIngredient[] }>([
        ["cocoa", { title: IngredientCategoriesNameMap.get("cocoa")!, data: beans }],
        [
          "cocoabutter",
          {
            title: IngredientCategoriesNameMap.get("cocoabutter")!,
            data: butters,
          },
        ],
        ["creamer", { title: IngredientCategoriesNameMap.get("creamer")!, data: milks }],
        [
          "sweetener",
          {
            title: IngredientCategoriesNameMap.get("sweetener")!,
            data: sugars,
          },
        ],
        [
          "flavoring",
          {
            title: IngredientCategoriesNameMap.get("flavoring")!,
            data: flavorings,
          },
        ],
      ]),
    [beans, butters, flavorings, milks, sugars]
  )

  return (
    <ul className={cn("flex flex-col gap-2", className)} {...props}>
      {INGREDIENT_CATEGORIES.map((category) => {
        const currentCategory = ListMap.get(category)!

        // TODO: refactor this down so it's easier to read the structure
        return (
          !!currentCategory.data.length && (
            <li key={category}>
              <p className="text-lg font-semibold">{currentCategory.title}</p>
              <ul className="ml-2 flex flex-col gap-1">
                {currentCategory.data.map((ingredient) => (
                  <li key={ingredient.uuid} className="flex flex-col">
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
}
