import type { NextPage } from "next"
import Head from "next/head"
import { PrimaryButton } from "../components/Button"
import {
  IngredientCategoriesNameMap,
  IngredientsProvider,
  INGREDIENT_CATEGORIES,
  TIngredient,
  TIngredientCategory,
  useIngredients,
} from "../hooks/useIngredients"
import { useMemo, useState } from "react"
import { Modal } from "../components/Modal"
import { AddIngredientForm } from "../components/AddIngredientForm"
import { Disclosure, Transition } from "@headlessui/react"
import { BsChevronDown } from "react-icons/bs"

// TODO: try and style this page, it's basic but it works
const IngredientManager: NextPage = () => {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <IngredientsProvider>
      <Head>
        <title>Chocolating - Ingredient manager</title>
      </Head>

      <div className="m-10 flex flex-col gap-4">
        <h1 className="text-3xl">Ingredient manager</h1>

        <PrimaryButton onClick={openModal} className="sm:w-auto md:w-fit">
          Add ingredient
        </PrimaryButton>
        <Modal
          isOpen={isOpen}
          closeModal={closeModal}
          title="Add an ingredient"
        >
          <AddIngredientForm onSubmit={closeModal} />
        </Modal>

        <IngredientsList />
      </div>
    </IngredientsProvider>
  )
}

export default IngredientManager

const IngredientsList = () => {
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

        return (
          !!currentCategory.data.length && (
            <li key={category}>
              <p className="text-lg font-semibold">{currentCategory.title}</p>
              <ul className="ml-2 flex flex-col gap-2">
                {currentCategory.data.map(({ uuid, name, nutrition }) => (
                  <li key={uuid} className="flex flex-col">
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex flex-row items-center justify-between rounded-sm bg-gray-300 px-2">
                            {name}
                            <BsChevronDown
                              className={open ? "rotate-180 transform" : ""}
                            />
                          </Disclosure.Button>
                          <div className="overflow-hidden">
                            <Transition
                              enter="transition duration-100 ease-out"
                              enterFrom="transform -translate-y-full opacity-0"
                              enterTo="transform translate-y-0 opacity-100"
                              leave="transition duration-80 ease-out"
                              leaveFrom="transform translate-y-0 opacity-100"
                              leaveTo="transform -translate-y-full opacity-0"
                            >
                              <Disclosure.Panel className="text-gray-500">
                                {/* TODO: make this nice, not important */}
                                <pre>{JSON.stringify(nutrition, null, 4)}</pre>
                              </Disclosure.Panel>
                            </Transition>
                          </div>
                        </>
                      )}
                    </Disclosure>
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
