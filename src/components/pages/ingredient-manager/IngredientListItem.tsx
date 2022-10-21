import { Disclosure, Transition } from "@headlessui/react"
import { BsChevronDown } from "react-icons/bs"
import { TIngredient } from "hooks/useIngredients"

export const IngredientListItem = ({
  ingredient: { name, nutrition },
}: {
  ingredient: TIngredient
}) => (
  <Disclosure>
    {({ open }) => (
      <>
        <Disclosure.Button className="flex flex-row items-center justify-between rounded-sm bg-gray-300 px-2">
          {name}
          <BsChevronDown className={open ? "rotate-180 transform" : ""} />
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
              {/* TODO: make this nice, not important now really */}
              <pre>{JSON.stringify(nutrition, null, 4)}</pre>
            </Disclosure.Panel>
          </Transition>
        </div>
      </>
    )}
  </Disclosure>
)
