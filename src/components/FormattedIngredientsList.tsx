import { useMemo } from "react"
import {
  IngredientCategoriesNameMap,
  INGREDIENT_CATEGORIES,
  TIngredient,
  TIngredientCategory,
  useIngredients,
} from "../hooks/useIngredients"

export const FormattedIngredientsList = ({
  ListItem,
}: {
  ListItem: React.FC<{ ingredient: TIngredient }>
}) => {
  const { beans, butters, flavorings, milks, sugars } = useIngredients()

  const ListMap = useMemo(() => {
    return new Map<TIngredientCategory, { title: string; data: TIngredient[] }>(
      [
        [
          "cocoa",
          { title: IngredientCategoriesNameMap.get("cocoa")!, data: beans },
        ],
        [
          "cocoabutter",
          {
            title: IngredientCategoriesNameMap.get("cocoabutter")!,
            data: butters,
          },
        ],
        [
          "creamer",
          { title: IngredientCategoriesNameMap.get("creamer")!, data: milks },
        ],
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
      ]
    )
  }, [beans, butters, flavorings, milks, sugars])

  return (
    <ul className="flex flex-col gap-2">
      {INGREDIENT_CATEGORIES.map((category) => {
        const currentCategory = ListMap.get(category)!

        // TODO: refactor this down so it's easier to read the structure
        return (
          !!currentCategory.data.length && (
            <li key={category}>
              <p className="text-lg font-semibold">{currentCategory.title}</p>
              <ul className="ml-2 flex flex-col gap-2">
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
