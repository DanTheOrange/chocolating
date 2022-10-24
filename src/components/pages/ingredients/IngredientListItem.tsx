import { Disclosure, Transition } from "@headlessui/react"
import { BsChevronDown } from "react-icons/bs"
import cn from "classnames"
import { Ingredients } from "@prisma/client"

export const IngredientListItem = ({
  ingredient: { id, name, description, type, ...nutrition },
}: {
  ingredient: Ingredients
}) => (
  <Disclosure>
    {({ open }) => (
      <>
        <Disclosure.Button
          className={cn("flex flex-row items-center justify-between bg-gray-300 px-2", {
            "rounded-t-md": open,
            "rounded-md": !open,
          })}
        >
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
            <Disclosure.Panel as="pre" className="rounded-b-md bg-gray-300 p-2">
              {description && <p>{description}</p>}
              {/* TODO: make this nice, not important now really */}
              {JSON.stringify({ id, type, nutrition }, null, 4)}
            </Disclosure.Panel>
          </Transition>
        </div>
      </>
    )}
  </Disclosure>
)
